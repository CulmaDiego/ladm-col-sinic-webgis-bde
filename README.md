# LADM_COL SINIC WebGIS BDE

Aplicacion web para registrar y consultar informacion catastral basada en el
modelo LADM_COL SINIC. El proyecto une una interfaz web, una API REST y una base
de datos espacial en PostgreSQL + PostGIS.

## Que hace la aplicacion

La aplicacion permite trabajar con informacion catastral basica:

- Interesados: personas naturales o juridicas relacionadas con un predio.
- Unidades administrativas: informacion predial administrativa y economica.
- Derechos interesados: relacion entre un interesado y una unidad administrativa.
- Unidades espaciales: geometria principal del predio.
- Topografia y representacion: elementos levantados o representados sobre una
  unidad espacial.
- Cartografia catastral: capas de apoyo como vias, manzanas, sectores o
  linderos.

Tambien incluye secciones de aprendizaje sobre SINIC, UML, LADM, INTERLIS y XTF,
ademas de botones para generar y restaurar backups de la base de datos.

## Entrada y salida

### Entrada

El sistema recibe datos desde formularios web. Los datos principales son:

- Datos de identificacion: tipo de documento, numero de documento, nombre,
  correo, telefono y direccion.
- Datos prediales: codigo predial, matricula inmobiliaria, municipio, tipo de
  predio, areas, avaluo y estado.
- Relaciones: interesado, unidad administrativa y unidad espacial seleccionados
  desde listas desplegables.
- Geometrias: texto WKT en `EPSG:9377`, por ejemplo `POINT(...)`,
  `LINESTRING(...)` o `POLYGON(...)`.
- Backups: archivos `.backup` generados por la misma aplicacion.

### Salida

La aplicacion entrega:

- Tablas en pantalla con los registros guardados.
- Respuestas JSON desde la API FastAPI.
- Geometrias guardadas en PostGIS y devueltas como WKT/GeoJSON.
- Archivos `.backup` descargables.
- Datos restaurados en la base de datos cuando se carga un backup valido.

## Tecnologias usadas

- Frontend: React + Vite.
- Backend: FastAPI.
- Base de datos: PostgreSQL + PostGIS.
- Entorno Python: Pipenv.
- SRID de trabajo: `EPSG:9377`.

## Estructura del proyecto

```text
backend/      API FastAPI, modelos, schemas, routers y servicios
frontend/     Interfaz React + Vite
database/     Scripts SQL para preparar la base de datos
backup/       Carpeta local para respaldos .backup
docs/         Documentacion de apoyo del modelo
```

## Base de datos

Nombre de la base de datos:

```text
bde_ladm_sinic
```

Datos de conexion usados por defecto:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bde_ladm_sinic
DB_USER=sinic_app
DB_PASSWORD=sinic_app_123
```

El proyecto usa PostGIS normal. No usa `postgis_topology`.

## Preparar la base de datos

Crear la base de datos:

```bash
createdb -U postgres -h localhost -p 5432 bde_ladm_sinic
```

Ejecutar los scripts SQL:

```bash
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/01_create_extensions_and_schemas.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/02_create_tables.sql
psql -U postgres -h localhost -p 5432 -d bde_ladm_sinic -f database/03_seed_data.sql
```

Crear o verificar el usuario de la aplicacion:

```sql
CREATE USER sinic_app WITH PASSWORD 'sinic_app_123';
GRANT USAGE ON SCHEMA ladm_sinic, catalogos, auditoria TO sinic_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ladm_sinic TO sinic_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ladm_sinic TO sinic_app;
```

Si el usuario ya existe, solo ejecutar los `GRANT`.

## Ejecutar el backend

En Windows PowerShell:

```powershell
cd backend
py -m pipenv install
Copy-Item .env.example .env
py -m pipenv run uvicorn app.main:app --reload
```

El backend queda disponible en:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

Health check:

```text
http://localhost:8000/health
```

Si los botones de backup no encuentran `pg_dump` o `pg_restore`, configurar
`PG_BIN_DIR` en `backend/.env`. Ejemplo:

```env
PG_BIN_DIR=C:\Program Files\PostgreSQL\16\bin
```

## Ejecutar el frontend

En otra terminal de PowerShell:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

El frontend queda disponible en:

```text
http://localhost:5173
```

La variable principal del frontend es:

```text
VITE_API_URL=http://localhost:8000
```

## Secciones de la aplicacion

### Inicio

Muestra el resumen del proyecto, el estado de conexion con la API y la base de
datos. Tambien incluye los botones para descargar y restaurar backups.

### Aprende SINIC

Explica de forma corta que es SINIC, que busca la Resolucion 301, conceptos
basicos del articulo de definiciones, estandares ISO 19152, INTERLIS y XTF.

### Aprende UML

Explica que es UML y como se relacionan clases, atributos y tablas. Incluye un
diagrama visual del modelo usado en el proyecto.

### Modelo de Datos SINIC

Presenta las entidades principales y su relacion dentro de la base de datos.
Desde esta seccion se puede entrar a los CRUD.

### CRUD

Cada modulo permite crear, listar, editar y eliminar registros. Los campos de
relacion usan listas desplegables para evitar escribir UUID manualmente.

## Orden recomendado para ingresar datos

Para probar la aplicacion sin errores de relacion, crear los registros en este
orden:

1. Interesados.
2. Unidades administrativas.
3. Derechos interesados.
4. Unidades espaciales.
5. Topografia y representacion.
6. Cartografia catastral.

En Derechos, Unidades Espaciales y Topografia se deben seleccionar registros
existentes desde las listas. No se deben escribir IDs a mano.

## Endpoints principales

```text
GET/POST/PUT/DELETE /api/interesados
GET/POST/PUT/DELETE /api/unidades-administrativas
GET/POST/PUT/DELETE /api/derechos-interesados
GET/POST/PUT/DELETE /api/unidades-espaciales
GET/POST/PUT/DELETE /api/topografia-representacion
GET/POST/PUT/DELETE /api/cartografia-catastral
GET              /api/backup
POST             /api/backup/restore
```

## Geometrias

Las tablas espaciales reciben geometria en WKT. Ejemplos:

```text
POINT(5000005 2000005)
```

```text
LINESTRING(5000000 2000000, 5000015 2000012)
```

```text
POLYGON((5000000 2000000, 5000015 2000000, 5000015 2000012, 5000000 2000012, 5000000 2000000))
```

Todas las geometrias se guardan con SRID `EPSG:9377`.

## Backup y restore

Desde la pantalla de Inicio:

- Descargar backup: genera un archivo `.backup` con los datos del proyecto.
- Restaurar backup: carga un archivo `.backup` y reemplaza los datos actuales de
  las tablas del proyecto.

Los backups no se suben al repositorio porque pueden contener datos locales.

## Verificacion rapida

Backend:

```powershell
cd backend
py -m pipenv run python -m compileall app
```

Frontend:

```powershell
cd frontend
npm run build
```

API:

```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" -UseBasicParsing
```

## Repositorio

```text
https://github.com/CulmaDiego/ladm-col-sinic-webgis-bde.git
```

Rama principal:

```text
main
```

## Notas

- No subir archivos `.env`.
- No subir `node_modules`, `dist`, caches ni archivos `.backup`.
- Los archivos `.env.example` quedan como guia de configuracion.
- Los scripts de `database/` preparan la estructura necesaria para ejecutar la
  aplicacion.
