from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.routers import (
    cartografia_catastral_router,
    derecho_interesado_router,
    interesado_router,
    topografia_representacion_router,
    unidad_administrativa_router,
    unidad_espacial_router,
)


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
)

app.include_router(interesado_router.router)
app.include_router(unidad_administrativa_router.router)
app.include_router(derecho_interesado_router.router)
app.include_router(unidad_espacial_router.router)
app.include_router(topografia_representacion_router.router)
app.include_router(cartografia_catastral_router.router)


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
