# Backend FastAPI

Backend academico para el proyecto `ladm-col-sinic-webgis-bde`.

## Requisitos

- Python 3.11 o superior
- Pipenv
- PostgreSQL con PostGIS
- Base de datos `bde_ladm_sinic`

## Configuracion

```bash
cd backend
pipenv install
cp .env.example .env
```

En Windows PowerShell puedes copiar el archivo con:

```powershell
Copy-Item .env.example .env
```

## Ejecucion

```bash
pipenv run uvicorn app.main:app --reload
```

URLs principales:

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## CRUD disponibles

- `/api/interesados`
- `/api/unidades-administrativas`
- `/api/derechos-interesados`
- `/api/unidades-espaciales`
- `/api/topografia-representacion`
- `/api/cartografia-catastral`

Las entidades espaciales aceptan geometria como WKT o GeoJSON simple y devuelven
`geometria_wkt` y `geometria_geojson` usando funciones PostGIS.
