from sqlalchemy import Column, DateTime, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry

from app.database import Base


class CartografiaCatastral(Base):
    __tablename__ = "cartografia_catastral"
    __table_args__ = {"schema": "ladm_sinic"}

    id_cartografia = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    tipo_elemento = Column(String(100))
    codigo = Column(String(80))
    nombre = Column(String(180))
    fuente = Column(String(180))
    escala = Column(String(80))
    geometria = Column(Geometry("GEOMETRY", srid=9377))
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
