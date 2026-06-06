# Backend FastAPI

Backend academico para el proyecto `ladm-col-sinic-webgis-bde`.

## Requisitos

- Python 3.11 o superior
- Pipenv
- PostgreSQL con PostGIS
- Base de datos `bde_ladm_sinic`
- `pg_dump` y `pg_restore` disponibles en PATH o configurados con `PG_BIN_DIR`

## Configuracion

Comandos recomendados en Windows PowerShell:

```powershell
cd backend
py -m pipenv install
Copy-Item .env.example .env
```

Si PostgreSQL no esta en el PATH de Windows, edita `.env` y define:

```env
PG_BIN_DIR=C:\Program Files\PostgreSQL\16\bin
```

Si `pipenv` esta disponible directamente en tu terminal, tambien puedes usar:

```bash
cd backend
pipenv install
cp .env.example .env
```

En macOS/Linux, si `python` no apunta a Python 3, usa `python3 -m pipenv`.

## Ejecucion

Windows PowerShell:

```powershell
py -m pipenv run uvicorn app.main:app --reload
```

Alternativa cuando `pipenv` esta en PATH:

```bash
pipenv run uvicorn app.main:app --reload
```

URLs principales:

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Verificacion rapida

```powershell
py -m pipenv run python -m compileall app
Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" -UseBasicParsing
```

## CRUD disponibles

- `/api/interesados`
- `/api/unidades-administrativas`
- `/api/derechos-interesados`
- `/api/unidades-espaciales`
- `/api/topografia-representacion`
- `/api/cartografia-catastral`
- `/api/backup`
- `/api/backup/restore`

Las entidades espaciales aceptan geometria como WKT o GeoJSON simple y devuelven
`geometria_wkt` y `geometria_geojson` usando funciones PostGIS.

## Backup y restore

- `GET /api/backup` genera y descarga un `.backup` con datos de los schemas del
  proyecto.
- `POST /api/backup/restore` recibe un archivo `.backup` y reemplaza los datos
  actuales de las tablas del proyecto.

Los archivos `.backup` estan ignorados por Git.
