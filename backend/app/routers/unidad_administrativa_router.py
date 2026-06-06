from app.models.unidad_administrativa import UnidadAdministrativa
from app.routers.base_router import create_crud_router
from app.schemas.unidad_administrativa_schema import (
    UnidadAdministrativaCreate,
    UnidadAdministrativaRead,
    UnidadAdministrativaUpdate,
)


router = create_crud_router(
    model=UnidadAdministrativa,
    create_schema=UnidadAdministrativaCreate,
    update_schema=UnidadAdministrativaUpdate,
    read_schema=UnidadAdministrativaRead,
    prefix="/api/unidades-administrativas",
    tags=["Unidades administrativas"],
)
