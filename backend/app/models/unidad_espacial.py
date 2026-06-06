from sqlalchemy import Column, Date, DateTime, ForeignKey, Numeric, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry

from app.database import Base


class UnidadEspacial(Base):
    __tablename__ = "unidad_espacial"
    __table_args__ = {"schema": "ladm_sinic"}

    id_unidad_espacial = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    id_unidad_administrativa = Column(
        UUID(as_uuid=True),
        ForeignKey("ladm_sinic.unidad_administrativa.id_unidad_administrativa"),
    )
    tipo_unidad_espacial = Column(String(100))
    etiqueta = Column(String(120))
    area_calculada = Column(Numeric(14, 2))
    geometria = Column(Geometry("POLYGON", srid=9377))
    fecha_inicio_vigencia = Column(Date)
    fecha_fin_vigencia = Column(Date)
    estado = Column(String(80))
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
