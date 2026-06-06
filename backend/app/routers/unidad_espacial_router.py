from app.models.unidad_espacial import UnidadEspacial
from app.routers.base_router import create_geometry_crud_router
from app.schemas.unidad_espacial_schema import (
    UnidadEspacialCreate,
    UnidadEspacialRead,
    UnidadEspacialUpdate,
)


router = create_geometry_crud_router(
    model=UnidadEspacial,
    create_schema=UnidadEspacialCreate,
    update_schema=UnidadEspacialUpdate,
    read_schema=UnidadEspacialRead,
    prefix="/api/unidades-espaciales",
    tags=["Unidades espaciales"],
)
