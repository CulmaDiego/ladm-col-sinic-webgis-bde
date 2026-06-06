-- Tablas principales del proyecto academico LADM_COL SINIC.
-- Ejecutar despues de 01_create_extensions_and_schemas.sql.
-- No se crea ni se requiere postgis_topology.

CREATE OR REPLACE FUNCTION auditoria.set_fecha_actualizacion()
RETURNS trigger AS $$
BEGIN
    NEW.fecha_actualizacion = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS ladm_sinic.interesado (
    id_interesado UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_interesado VARCHAR(80),
    tipo_documento VARCHAR(80),
    numero_documento VARCHAR(50),
    nombre_razon_social VARCHAR(255),
    correo VARCHAR(180),
    telefono VARCHAR(80),
    direccion VARCHAR(255),
    fecha_creacion TIMESTAMPTZ DEFAULT now(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ladm_sinic.unidad_administrativa (
    id_unidad_administrativa UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_predial VARCHAR(80),
    matricula_inmobiliaria VARCHAR(80),
    departamento VARCHAR(120),
    municipio VARCHAR(120),
    direccion VARCHAR(255),
    tipo_predio VARCHAR(80),
    destinacion_economica VARCHAR(120),
    area_terreno NUMERIC(14, 2),
    area_construida NUMERIC(14, 2),
    avaluo_catastral NUMERIC(18, 2),
    fecha_inicio_vigencia DATE,
    fecha_fin_vigencia DATE,
    estado VARCHAR(80),
    fecha_creacion TIMESTAMPTZ DEFAULT now(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ladm_sinic.derecho_interesado (
    id_derecho UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_interesado UUID REFERENCES ladm_sinic.interesado(id_interesado)
        ON UPDATE CASCADE ON DELETE SET NULL,
    id_unidad_administrativa UUID REFERENCES ladm_sinic.unidad_administrativa(id_unidad_administrativa)
        ON UPDATE CASCADE ON DELETE SET NULL,
    tipo_derecho VARCHAR(100),
    porcentaje_participacion NUMERIC(5, 2),
    observacion TEXT,
    fecha_inicio_vigencia DATE,
    fecha_fin_vigencia DATE,
    estado VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS ladm_sinic.unidad_espacial (
    id_unidad_espacial UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_unidad_administrativa UUID REFERENCES ladm_sinic.unidad_administrativa(id_unidad_administrativa)
        ON UPDATE CASCADE ON DELETE SET NULL,
    tipo_unidad_espacial VARCHAR(100),
    etiqueta VARCHAR(120),
    area_calculada NUMERIC(14, 2),
    geometria geometry(POLYGON, 9377),
    fecha_inicio_vigencia DATE,
    fecha_fin_vigencia DATE,
    estado VARCHAR(80),
    fecha_creacion TIMESTAMPTZ DEFAULT now(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ladm_sinic.topografia_representacion (
    id_topografia UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_unidad_espacial UUID REFERENCES ladm_sinic.unidad_espacial(id_unidad_espacial)
        ON UPDATE CASCADE ON DELETE SET NULL,
    tipo_elemento VARCHAR(100),
    metodo_captura VARCHAR(120),
    precision_posicional NUMERIC(10, 3),
    fuente_datos VARCHAR(180),
    observacion TEXT,
    geometria geometry(GEOMETRY, 9377),
    fecha_levantamiento DATE,
    fecha_creacion TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ladm_sinic.cartografia_catastral (
    id_cartografia UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_elemento VARCHAR(100),
    codigo VARCHAR(80),
    nombre VARCHAR(180),
    fuente VARCHAR(180),
    escala VARCHAR(80),
    geometria geometry(GEOMETRY, 9377),
    fecha_creacion TIMESTAMPTZ DEFAULT now(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_interesado_documento
    ON ladm_sinic.interesado(tipo_documento, numero_documento);

CREATE INDEX IF NOT EXISTS idx_unidad_administrativa_codigo_predial
    ON ladm_sinic.unidad_administrativa(codigo_predial);

CREATE INDEX IF NOT EXISTS idx_derecho_interesado_interesado
    ON ladm_sinic.derecho_interesado(id_interesado);

CREATE INDEX IF NOT EXISTS idx_derecho_interesado_unidad_administrativa
    ON ladm_sinic.derecho_interesado(id_unidad_administrativa);

CREATE INDEX IF NOT EXISTS idx_unidad_espacial_unidad_administrativa
    ON ladm_sinic.unidad_espacial(id_unidad_administrativa);

CREATE INDEX IF NOT EXISTS idx_unidad_espacial_geometria
    ON ladm_sinic.unidad_espacial USING GIST (geometria);

CREATE INDEX IF NOT EXISTS idx_topografia_unidad_espacial
    ON ladm_sinic.topografia_representacion(id_unidad_espacial);

CREATE INDEX IF NOT EXISTS idx_topografia_geometria
    ON ladm_sinic.topografia_representacion USING GIST (geometria);

CREATE INDEX IF NOT EXISTS idx_cartografia_geometria
    ON ladm_sinic.cartografia_catastral USING GIST (geometria);

DROP TRIGGER IF EXISTS trg_interesado_fecha_actualizacion
    ON ladm_sinic.interesado;
CREATE TRIGGER trg_interesado_fecha_actualizacion
BEFORE UPDATE ON ladm_sinic.interesado
FOR EACH ROW EXECUTE FUNCTION auditoria.set_fecha_actualizacion();

DROP TRIGGER IF EXISTS trg_unidad_administrativa_fecha_actualizacion
    ON ladm_sinic.unidad_administrativa;
CREATE TRIGGER trg_unidad_administrativa_fecha_actualizacion
BEFORE UPDATE ON ladm_sinic.unidad_administrativa
FOR EACH ROW EXECUTE FUNCTION auditoria.set_fecha_actualizacion();

DROP TRIGGER IF EXISTS trg_unidad_espacial_fecha_actualizacion
    ON ladm_sinic.unidad_espacial;
CREATE TRIGGER trg_unidad_espacial_fecha_actualizacion
BEFORE UPDATE ON ladm_sinic.unidad_espacial
FOR EACH ROW EXECUTE FUNCTION auditoria.set_fecha_actualizacion();

DROP TRIGGER IF EXISTS trg_cartografia_fecha_actualizacion
    ON ladm_sinic.cartografia_catastral;
CREATE TRIGGER trg_cartografia_fecha_actualizacion
BEFORE UPDATE ON ladm_sinic.cartografia_catastral
FOR EACH ROW EXECUTE FUNCTION auditoria.set_fecha_actualizacion();
