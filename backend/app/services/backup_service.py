import os
import shutil
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, status
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import settings


APP_SCHEMAS = ["ladm_sinic", "catalogos", "auditoria"]
DELETE_ORDER = [
    "ladm_sinic.topografia_representacion",
    "ladm_sinic.unidad_espacial",
    "ladm_sinic.derecho_interesado",
    "ladm_sinic.cartografia_catastral",
    "ladm_sinic.unidad_administrativa",
    "ladm_sinic.interesado",
]


def _tool_names(tool_name: str) -> list[str]:
    if os.name == "nt":
        return [f"{tool_name}.exe", tool_name]
    return [tool_name]


def _resolve_postgres_tool(tool_name: str) -> str:
    if settings.pg_bin_dir:
        pg_bin_dir = Path(settings.pg_bin_dir)
        for name in _tool_names(tool_name):
            candidate = pg_bin_dir / name
            if candidate.exists():
                return str(candidate)

    for name in _tool_names(tool_name):
        found = shutil.which(name)
        if found:
            return found

    if os.name == "nt":
        postgres_root = Path("C:/Program Files/PostgreSQL")
        if postgres_root.exists():
            candidates = []
            for name in _tool_names(tool_name):
                candidates.extend(postgres_root.glob(f"*/bin/{name}"))
            if candidates:
                return str(sorted(candidates)[-1])

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=(
            f"No se encontro {tool_name}. Agrega PostgreSQL al PATH o define "
            "PG_BIN_DIR con la ruta de la carpeta bin de PostgreSQL."
        ),
    )


def _postgres_env() -> dict[str, str]:
    env = os.environ.copy()
    env["PGPASSWORD"] = settings.db_password
    return env


def _run_postgres_command(command: list[str], action: str) -> None:
    try:
        result = subprocess.run(
            command,
            check=False,
            capture_output=True,
            env=_postgres_env(),
            text=True,
            timeout=settings.backup_timeout_seconds,
        )
    except subprocess.TimeoutExpired as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"La operacion de {action} supero el tiempo limite.",
        ) from exc

    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No fue posible completar el {action}: {detail}",
        )


def _connection_args() -> list[str]:
    return [
        "-h",
        settings.db_host,
        "-p",
        str(settings.db_port),
        "-U",
        settings.db_user,
        "-d",
        settings.db_name,
    ]


def create_backup_file() -> tuple[Path, str]:
    backup_dir = Path(tempfile.gettempdir()) / "ladm_sinic_backups"
    backup_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"bde_ladm_sinic_{timestamp}_{uuid4().hex[:8]}.backup"
    output_path = backup_dir / filename
    command = [
        _resolve_postgres_tool("pg_dump"),
        *_connection_args(),
        "-F",
        "c",
        "--data-only",
        "--no-owner",
        "--no-privileges",
        "-f",
        str(output_path),
    ]

    for schema in APP_SCHEMAS:
        command.extend(["--schema", schema])

    _run_postgres_command(command, "backup")
    return output_path, filename


def _clear_project_data(db: Session) -> None:
    try:
        for table_name in DELETE_ORDER:
            db.execute(text(f"DELETE FROM {table_name}"))
        db.commit()
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No fue posible limpiar los datos actuales: {exc}",
        ) from exc


def restore_backup_file(backup_path: Path, db: Session) -> None:
    pg_restore = _resolve_postgres_tool("pg_restore")

    _run_postgres_command([pg_restore, "--list", str(backup_path)], "validacion")
    _clear_project_data(db)

    command = [
        pg_restore,
        *_connection_args(),
        "--data-only",
        "--no-owner",
        "--no-privileges",
        "--single-transaction",
        str(backup_path),
    ]
    _run_postgres_command(command, "restore")
