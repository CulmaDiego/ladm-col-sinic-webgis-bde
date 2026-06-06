from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class DerechoInteresadoBase(BaseModel):
    id_interesado: UUID | None = None
    id_unidad_administrativa: UUID | None = None
    tipo_derecho: str | None = None
    porcentaje_participacion: Decimal | None = None
    observacion: str | None = None
    fecha_inicio_vigencia: date | None = None
    fecha_fin_vigencia: date | None = None
    estado: str | None = None


class DerechoInteresadoCreate(DerechoInteresadoBase):
    pass


class DerechoInteresadoUpdate(DerechoInteresadoBase):
    pass


class DerechoInteresadoRead(DerechoInteresadoBase):
    id_derecho: UUID

    model_config = ConfigDict(from_attributes=True)
