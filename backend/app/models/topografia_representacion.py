from sqlalchemy import Column, Date, DateTime, ForeignKey, Numeric, String, Text, func, text
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry

from app.database import Base


class TopografiaRepresentacion(Base):
    __tablename__ = "topografia_representacion"
    __table_args__ = {"schema": "ladm_sinic"}

    id_topografia = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    id_unidad_espacial = Column(
        UUID(as_uuid=True), ForeignKey("ladm_sinic.unidad_espacial.id_unidad_espacial")
    )
    tipo_elemento = Column(String(100))
    metodo_captura = Column(String(120))
    precision_posicional = Column(Numeric(10, 3))
    fuente_datos = Column(String(180))
    observacion = Column(Text)
    geometria = Column(Geometry("GEOMETRY", srid=9377))
    fecha_levantamiento = Column(Date)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
