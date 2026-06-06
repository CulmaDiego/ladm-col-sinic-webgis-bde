from app.models.derecho_interesado import DerechoInteresado
from app.routers.base_router import create_crud_router
from app.schemas.derecho_interesado_schema import (
    DerechoInteresadoCreate,
    DerechoInteresadoRead,
    DerechoInteresadoUpdate,
)


router = create_crud_router(
    model=DerechoInteresado,
    create_schema=DerechoInteresadoCreate,
    update_schema=DerechoInteresadoUpdate,
    read_schema=DerechoInteresadoRead,
    prefix="/api/derechos-interesados",
    tags=["Derechos interesados"],
)
