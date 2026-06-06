# ladm-col-sinic-webgis-bde

Aplicacion web academica para gestionar datos catastrales conforme al enfoque
LADM_COL SINIC V1.0 usando PostgreSQL/PostGIS, FastAPI y React.

## Objetivo

El proyecto integra un backend REST, un frontend web y scripts de base de datos
espacial para administrar entidades catastrales basicas: interesados, unidades
administrativas, derechos, unidades espaciales, topografia y cartografia
catastral.

La base de datos objetivo es:

- `DB_NAME=bde_ladm_sinic`
- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USER=sinic_app`
- `DB_PASSWORD=sinic_app_123`
- SRID de geometrias: `EPSG:9377`

El proyecto usa PostgreSQL + PostGIS normal. No usa `postgis_topology`.

## Cumplimiento de entregables

- Aplicacion web con frontend React + Vite y backend FastAPI.
- Seccion **Aprende SINIC** con explicacion de Resolucion 301, articulo de
  definiciones, estandares ISO 19152 LADM, INTERLIS y formato XTF.
- Seccion **Aprende UML** con explicacion de UML, clases, atributos y diagrama
  visual del modelo.
- Seccion **Modelo de Datos SINIC** con resumen de entidades y acceso a CRUD.
- CRUD completo para Unidad Administrativa, Unidad Espacial, Interesados,
  Derechos Interesados, Topografia y Representacion, y Cartografia Catastral.
- Base de datos espacial PostgreSQL + PostGIS con geometrias en `EPSG:9377`,
  estructurada como modelo academico basado en LADM_COL SINIC V1.0.
- Backup y restore desde la interfaz web usando archivos `.backup`.

## Estructura

```text
ladm-col-sinic-webgis-bde/
|-- backend/
|   |-- app/
|   |   |-- main.py
|   |   |-- database.py
|   |   |-- config.py
|   |   |-- models/
|   |   |-- schemas/
|   |   |-- routers/
|   |   `-- services/
|   |-- Pipfile
|   |-- Pipfile.lock
|   |-- .env.example
|   `-- README.md
|-- frontend/
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   |-- vite.config.js
|   |-- .env.example
|   `-- src/
|-- database/
|   |-- 01_create_extensions_and_schemas.sql
|   |-- 02_create_tables.sql
|   |-- 03_seed_data.sql
|   `-- README.md
|-- backup/
|   `-- README.md
|-- docs/
|   |-- informe_preparacion_bd.tex
|   `-- modelo_datos.md
|-- .gitignore
`-- README.md
```

## Requisitos previos

- Python 3.11+
- PostgreSQL
- PostGIS
- Pipenv
- Node.js
- npm
- Git
- Herramientas de PostgreSQL disponibles en PATH (`pg_dump` y `pg_restore`) o
  ruta configurada en `PG_BIN_DIR`.

## Configuracion de base de datos

Crear la base de datos:

```bash
createdb -U postgres -h localhost -p 5432 bde_ladm_sinic
```

Ejecutar scripts:

```bash
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/01_create_extensions_and_schemas.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/02_create_tables.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/03_seed_data.sql
```

Crear o verificar el usuario de aplicacion:

```sql
CREATE USER sinic_app WITH PASSWORD 'sinic_app_123';
GRANT USAGE ON SCHEMA ladm_sinic, catalogos, auditoria TO sinic_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ladm_sinic TO sinic_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ladm_sinic TO sinic_app;
```

## Configuracion del backend

Comandos recomendados en Windows PowerShell:

```powershell
cd backend
py -m pipenv install
Copy-Item .env.example .env
py -m pipenv run uvicorn app.main:app --reload
```

Si `pg_dump` o `pg_restore` no se reconocen en Windows, define `PG_BIN_DIR` en
`backend/.env` con la carpeta `bin` de PostgreSQL. Ejemplo:

```env
PG_BIN_DIR=C:\Program Files\PostgreSQL\16\bin
```

Si `pipenv` esta disponible directamente en tu terminal, tambien puedes usar:

```bash
cd backend
pipenv install
cp .env.example .env
pipenv run uvicorn app.main:app --reload
```

En macOS/Linux, si `python` no apunta a Python 3, usa `python3 -m pipenv`.

## Configuracion del frontend

El frontend fue desarrollado con React + Vite, usa CSS propio y consume la API
FastAPI mediante la variable `VITE_API_URL` definida en `frontend/.env`.

Comandos recomendados en Windows PowerShell:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

En macOS/Linux:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## URLs de ejecucion

- Backend: http://localhost:8000
- Documentacion Swagger: http://localhost:8000/docs
- Health check: http://localhost:8000/health
- Frontend: http://localhost:5173

## Verificacion rapida

Con backend y frontend en ejecucion, puedes comprobar la API desde PowerShell:

```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/interesados" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/unidades-administrativas" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/derechos-interesados" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/unidades-espaciales" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/topografia-representacion" -UseBasicParsing
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/cartografia-catastral" -UseBasicParsing
```

Para validar compilacion local:

```powershell
cd backend
py -m pipenv run python -m compileall app

cd ../frontend
npm run build
```

## Secciones del frontend

- **Inicio:** resumen del proyecto, estado de conexion y acceso a entidades.
- **Aprende SINIC:** explicacion corta sobre SINIC, reporte catastral,
  LADM_COL SINIC, INTERLIS y XTF.
- **Aprende UML:** conceptos de clase, atributo, relacion y diagrama de clases.
- **Modelo de Datos SINIC:** descripcion de entidades y botones hacia cada CRUD.
- **Backup y restore:** botones en Inicio para descargar o restaurar datos de la
  base de datos en formato `.backup`.

## CRUD implementados

El backend y el frontend implementan operaciones de listar, consultar, crear,
editar y eliminar para:

- Interesados: `/api/interesados`
- Unidades administrativas: `/api/unidades-administrativas`
- Derechos interesados: `/api/derechos-interesados`
- Unidades espaciales: `/api/unidades-espaciales`
- Topografia y representacion: `/api/topografia-representacion`
- Cartografia catastral: `/api/cartografia-catastral`
- Backup de datos: `/api/backup`
- Restore de datos: `/api/backup/restore`

Las tablas con geometria aceptan WKT o GeoJSON simple en el campo `geometria`.
Las respuestas devuelven `geometria_wkt` y `geometria_geojson`.

Ejemplo WKT de poligono:

```text
POLYGON((5000000 2000000, 5000010 2000000, 5000010 2000012, 5000000 2000012, 5000000 2000000))
```

Ejemplo WKT de punto:

```text
POINT(5000005 2000005)
```

## Backup

Desde el frontend, en **Inicio**, usa:

- **Descargar backup:** genera un archivo `.backup` con los datos de los schemas
  del proyecto.
- **Restaurar backup:** carga un `.backup` generado por la aplicacion y reemplaza
  los datos actuales de las tablas del proyecto.

Los archivos `.backup` no se suben al repositorio. Quedan ignorados por Git.

Generar backup manual:

```bash
pg_dump -U sinic_app -h localhost -p 5432 -d bde_ladm_sinic -F c --data-only --schema ladm_sinic --schema catalogos --schema auditoria -f backup/bde_ladm_sinic.backup
```

Restaurar backup manual:

```bash
pg_restore -U sinic_app -h localhost -p 5432 -d bde_ladm_sinic --data-only --no-owner --no-privileges --single-transaction backup/bde_ladm_sinic.backup
```

## Repositorio

Repositorio del proyecto para revision:

- https://github.com/CulmaDiego/ladm-col-sinic-webgis-bde.git

La rama principal es `main`. El repositorio incluye codigo fuente, scripts SQL,
documentacion, archivos `.env.example` y archivos de bloqueo de dependencias.

## Notas importantes

- No subir archivos `.env` reales. Solo se versionan `.env.example`.
- Los archivos `*.backup`, `node_modules`, `dist`, `.venv` y caches se ignoran.
- La carpeta `database` documenta y crea los elementos necesarios de PostGIS.
- El frontend no usa datos quemados para los CRUD; consume la API configurada en
  `VITE_API_URL`.

## Referencias academicas

- [Resolucion 301 de 2025 - IGAC](https://www.igac.gov.co/index.php/transparencia-y-acceso-a-la-informacion-publica/normograma/resolucion-301-de-2025)
- [Reporte de Informacion Catastral - IGAC](https://www.igac.gov.co/catastro-multiproposito/reporte-de-informacion-catastral)
