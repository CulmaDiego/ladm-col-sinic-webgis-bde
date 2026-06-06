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

## CRUD implementados

El backend y el frontend implementan operaciones de listar, consultar, crear,
editar y eliminar para:

- Interesados: `/api/interesados`
- Unidades administrativas: `/api/unidades-administrativas`
- Derechos interesados: `/api/derechos-interesados`
- Unidades espaciales: `/api/unidades-espaciales`
- Topografia y representacion: `/api/topografia-representacion`
- Cartografia catastral: `/api/cartografia-catastral`

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

Generar backup:

```bash
pg_dump -U postgres -h localhost -p 5432 -d bde_ladm_sinic -F c -b -v -f backup/bde_ladm_sinic.backup
```

Restaurar backup:

```bash
pg_restore -U postgres -h localhost -p 5432 -d bde_ladm_sinic -v backup/bde_ladm_sinic.backup
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "Proyecto inicial LADM COL SINIC"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

En este repositorio el remoto configurado es:

```text
https://github.com/CulmaDiego/ladm-col-sinic-webgis-bde.git
```

## Notas importantes

- No subir archivos `.env` reales. Solo se versionan `.env.example`.
- Los archivos `*.backup`, `node_modules`, `dist`, `.venv` y caches se ignoran.
- La carpeta `database` documenta y crea los elementos necesarios de PostGIS.
- El frontend no usa datos quemados para los CRUD; consume la API configurada en
  `VITE_API_URL`.

## Referencias academicas

- [Resolucion 301 de 2025 - IGAC](https://www.igac.gov.co/index.php/transparencia-y-acceso-a-la-informacion-publica/normograma/resolucion-301-de-2025)
- [Reporte de Informacion Catastral - IGAC](https://www.igac.gov.co/catastro-multiproposito/reporte-de-informacion-catastral)
