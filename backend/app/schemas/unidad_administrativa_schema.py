from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UnidadAdministrativaBase(BaseModel):
    codigo_predial: str | None = None
    matricula_inmobiliaria: str | None = None
    departamento: str | None = None
    municipio: str | None = None
    direccion: str | None = None
    tipo_predio: str | None = None
    destinacion_economica: str | None = None
    area_terreno: Decimal | None = None
    area_construida: Decimal | None = None
    avaluo_catastral: Decimal | None = None
    fecha_inicio_vigencia: date | None = None
    fecha_fin_vigencia: date | None = None
    estado: str | None = None


class UnidadAdministrativaCreate(UnidadAdministrativaBase):
    pass


class UnidadAdministrativaUpdate(UnidadAdministrativaBase):
    pass


class UnidadAdministrativaRead(UnidadAdministrativaBase):
    id_unidad_administrativa: UUID
    fecha_creacion: datetime | None = None
    fecha_actualizacion: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
