from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class InteresadoBase(BaseModel):
    tipo_interesado: str | None = None
    tipo_documento: str | None = None
    numero_documento: str | None = None
    nombre_razon_social: str | None = None
    correo: str | None = None
    telefono: str | None = None
    direccion: str | None = None


class InteresadoCreate(InteresadoBase):
    pass


class InteresadoUpdate(InteresadoBase):
    pass


class InteresadoRead(InteresadoBase):
    id_interesado: UUID
    fecha_creacion: datetime | None = None
    fecha_actualizacion: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
