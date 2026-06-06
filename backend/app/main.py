from fastapi import Depends, FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.routers import (
    backup_router,
    cartografia_catastral_router,
    derecho_interesado_router,
    interesado_router,
    topografia_representacion_router,
    unidad_administrativa_router,
    unidad_espacial_router,
)


FIELD_LABELS = {
    "id_interesado": "Interesado",
    "id_unidad_administrativa": "Unidad administrativa",
    "id_unidad_espacial": "Unidad espacial",
    "file": "Archivo backup",
}


app = FastAPI(
    title="API LADM_COL SINIC WebGIS BDE",
    description="Backend academico para gestion catastral con PostgreSQL y PostGIS.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

app.include_router(interesado_router.router)
app.include_router(unidad_administrativa_router.router)
app.include_router(derecho_interesado_router.router)
app.include_router(unidad_espacial_router.router)
app.include_router(topografia_representacion_router.router)
app.include_router(cartografia_catastral_router.router)
app.include_router(backup_router.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exc: RequestValidationError):
    messages = []

    for error in exc.errors():
        field_name = error.get("loc", ["campo"])[-1]
        label = FIELD_LABELS.get(field_name, field_name)

        if "uuid" in str(error.get("type", "")):
            messages.append(
                f"{label}: debe seleccionar un registro existente con UUID valido."
            )
        elif "missing" in str(error.get("type", "")):
            messages.append(f"{label}: campo requerido.")
        else:
            messages.append(f"{label}: {error.get('msg', 'valor invalido')}.")

    return JSONResponse(
        status_code=422,
        content={"detail": " ".join(messages) or "Revise los datos enviados."},
    )


@app.get("/")
def read_root():
    return {
        "message": "API LADM_COL SINIC funcionando",
        "project": "ladm-col-sinic-webgis-bde",
    }


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "database": "disconnected"},
        ) from exc

    return {"status": "ok", "database": "connected"}
