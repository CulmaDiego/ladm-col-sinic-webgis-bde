from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CartografiaCatastralBase(BaseModel):
    tipo_elemento: str | None = None
    codigo: str | None = None
    nombre: str | None = None
    fuente: str | None = None
    escala: str | None = None


class CartografiaCatastralCreate(CartografiaCatastralBase):
    geometria: Any | None = Field(
        default=None,
        description="Geometria en WKT o GeoJSON simple con SRID 9377.",
    )


class CartografiaCatastralUpdate(CartografiaCatastralCreate):
    pass


class CartografiaCatastralRead(CartografiaCatastralBase):
    id_cartografia: UUID
    geometria_wkt: str | None = None
    geometria_geojson: Any | None = None
    fecha_creacion: datetime | None = None
    fecha_actualizacion: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
