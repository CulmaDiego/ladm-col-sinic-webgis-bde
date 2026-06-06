from app.models.interesado import Interesado
from app.routers.base_router import create_crud_router
from app.schemas.interesado_schema import (
    InteresadoCreate,
    InteresadoRead,
    InteresadoUpdate,
)


router = create_crud_router(
    model=Interesado,
    create_schema=InteresadoCreate,
    update_schema=InteresadoUpdate,
    read_schema=InteresadoRead,
    prefix="/api/interesados",
    tags=["Interesados"],
)
