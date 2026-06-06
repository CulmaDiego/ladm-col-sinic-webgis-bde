import shutil
import tempfile
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from starlette.background import BackgroundTask

from app.database import get_db
from app.services.backup_service import create_backup_file, restore_backup_file


router = APIRouter(prefix="/api/backup", tags=["Backup y restore"])


def _remove_file(path: Path) -> None:
    path.unlink(missing_ok=True)


@router.get("")
def descargar_backup():
    backup_path, filename = create_backup_file()
    return FileResponse(
        path=backup_path,
        filename=filename,
        media_type="application/octet-stream",
        background=BackgroundTask(_remove_file, backup_path),
    )


@router.post("/restore")
def restaurar_backup(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not file.filename or not file.filename.lower().endswith(".backup"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Seleccione un archivo .backup generado por la aplicacion.",
        )

    temp_dir = Path(tempfile.gettempdir()) / "ladm_sinic_backups"
    temp_dir.mkdir(parents=True, exist_ok=True)
    temp_path = temp_dir / f"restore_{Path(file.filename).name}"

    try:
        with temp_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        restore_backup_file(temp_path, db)
    finally:
        file.file.close()
        temp_path.unlink(missing_ok=True)

    return {
        "message": "Backup restaurado correctamente.",
        "filename": file.filename,
    }
