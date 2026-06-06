from sqlalchemy import Column, DateTime, String, func, text
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class Interesado(Base):
    __tablename__ = "interesado"
    __table_args__ = {"schema": "ladm_sinic"}

    id_interesado = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    tipo_interesado = Column(String(80))
    tipo_documento = Column(String(80))
    numero_documento = Column(String(50))
    nombre_razon_social = Column(String(255))
    correo = Column(String(180))
    telefono = Column(String(80))
    direccion = Column(String(255))
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
