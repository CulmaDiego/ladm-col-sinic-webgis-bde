from app.models.cartografia_catastral import CartografiaCatastral
from app.routers.base_router import create_geometry_crud_router
from app.schemas.cartografia_catastral_schema import (
    CartografiaCatastralCreate,
    CartografiaCatastralRead,
    CartografiaCatastralUpdate,
)


router = create_geometry_crud_router(
    model=CartografiaCatastral,
    create_schema=CartografiaCatastralCreate,
    update_schema=CartografiaCatastralUpdate,
    read_schema=CartografiaCatastralRead,
    prefix="/api/cartografia-catastral",
    tags=["Cartografia catastral"],
)
