from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class UnidadEspacialBase(BaseModel):
    id_unidad_administrativa: UUID | None = None
    tipo_unidad_espacial: str | None = None
    etiqueta: str | None = None
    area_calculada: Decimal | None = None
    fecha_inicio_vigencia: date | None = None
    fecha_fin_vigencia: date | None = None
    estado: str | None = None


class UnidadEspacialCreate(UnidadEspacialBase):
    geometria: Any | None = Field(
        default=None,
        description="Geometria en WKT o GeoJSON simple con SRID 9377.",
    )


class UnidadEspacialUpdate(UnidadEspacialCreate):
    pass


class UnidadEspacialRead(UnidadEspacialBase):
    id_unidad_espacial: UUID
    geometria_wkt: str | None = None
    geometria_geojson: Any | None = None
    fecha_creacion: datetime | None = None
    fecha_actualizacion: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
