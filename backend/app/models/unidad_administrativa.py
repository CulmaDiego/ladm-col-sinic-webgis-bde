from sqlalchemy import Column, Date, DateTime, Numeric, String, func, text
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class UnidadAdministrativa(Base):
    __tablename__ = "unidad_administrativa"
    __table_args__ = {"schema": "ladm_sinic"}

    id_unidad_administrativa = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    codigo_predial = Column(String(80))
    matricula_inmobiliaria = Column(String(80))
    departamento = Column(String(120))
    municipio = Column(String(120))
    direccion = Column(String(255))
    tipo_predio = Column(String(80))
    destinacion_economica = Column(String(120))
    area_terreno = Column(Numeric(14, 2))
    area_construida = Column(Numeric(14, 2))
    avaluo_catastral = Column(Numeric(18, 2))
    fecha_inicio_vigencia = Column(Date)
    fecha_fin_vigencia = Column(Date)
    estado = Column(String(80))
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
