from app.models.topografia_representacion import TopografiaRepresentacion
from app.routers.base_router import create_geometry_crud_router
from app.schemas.topografia_representacion_schema import (
    TopografiaRepresentacionCreate,
    TopografiaRepresentacionRead,
    TopografiaRepresentacionUpdate,
)


router = create_geometry_crud_router(
    model=TopografiaRepresentacion,
    create_schema=TopografiaRepresentacionCreate,
    update_schema=TopografiaRepresentacionUpdate,
    read_schema=TopografiaRepresentacionRead,
    prefix="/api/topografia-representacion",
    tags=["Topografia y representacion"],
)
