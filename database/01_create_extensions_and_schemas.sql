-- Proyecto: ladm-col-sinic-webgis-bde
-- Preparacion inicial de extensiones y schemas.
-- No se usa postgis_topology.

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS ladm_sinic;
CREATE SCHEMA IF NOT EXISTS catalogos;
CREATE SCHEMA IF NOT EXISTS auditoria;
