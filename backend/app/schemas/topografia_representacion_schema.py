from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class TopografiaRepresentacionBase(BaseModel):
    id_unidad_espacial: UUID | None = None
    tipo_elemento: str | None = None
    metodo_captura: str | None = None
    precision_posicional: Decimal | None = None
    fuente_datos: str | None = None
    observacion: str | None = None
    fecha_levantamiento: date | None = None


class TopografiaRepresentacionCreate(TopografiaRepresentacionBase):
    geometria: Any | None = Field(
        default=None,
        description="Geometria en WKT o GeoJSON simple con SRID 9377.",
    )


class TopografiaRepresentacionUpdate(TopografiaRepresentacionCreate):
    pass


class TopografiaRepresentacionRead(TopografiaRepresentacionBase):
    id_topografia: UUID
    geometria_wkt: str | None = None
    geometria_geojson: Any | None = None
    fecha_creacion: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
