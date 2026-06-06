# Base de datos espacial

Esta carpeta contiene scripts SQL para preparar la base `bde_ladm_sinic`.

Orden sugerido de ejecucion:

```bash
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/01_create_extensions_and_schemas.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/02_create_tables.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/03_seed_data.sql
```

Los scripts crean las extensiones `postgis` y `pgcrypto`, los schemas
`ladm_sinic`, `catalogos` y `auditoria`, las tablas principales, llaves
primarias, llaves foraneas, indices espaciales GIST y triggers de
actualizacion.

El proyecto usa geometria PostGIS normal con SRID EPSG:9377. No usa
`postgis_topology`.
