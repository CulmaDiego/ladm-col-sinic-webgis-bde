from sqlalchemy import Column, Date, ForeignKey, Numeric, String, Text, text
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class DerechoInteresado(Base):
    __tablename__ = "derecho_interesado"
    __table_args__ = {"schema": "ladm_sinic"}

    id_derecho = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    id_interesado = Column(
        UUID(as_uuid=True), ForeignKey("ladm_sinic.interesado.id_interesado")
    )
    id_unidad_administrativa = Column(
        UUID(as_uuid=True),
        ForeignKey("ladm_sinic.unidad_administrativa.id_unidad_administrativa"),
    )
    tipo_derecho = Column(String(100))
    porcentaje_participacion = Column(Numeric(5, 2))
    observacion = Column(Text)
    fecha_inicio_vigencia = Column(Date)
    fecha_fin_vigencia = Column(Date)
    estado = Column(String(80))
