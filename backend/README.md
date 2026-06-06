# Backend FastAPI

Backend academico para el proyecto `ladm-col-sinic-webgis-bde`.

## Requisitos

- Python 3.11 o superior
- Pipenv
- PostgreSQL con PostGIS
- Base de datos `bde_ladm_sinic`

## Configuracion

Comandos recomendados en Windows PowerShell:

```powershell
cd backend
py -m pipenv install
Copy-Item .env.example .env
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

Las entidades espaciales aceptan geometria como WKT o GeoJSON simple y devuelven
`geometria_wkt` y `geometria_geojson` usando funciones PostGIS.
