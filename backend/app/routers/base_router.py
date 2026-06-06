from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.geojson_service import geometry_expression, parse_geojson


def _commit_or_400(db: Session):
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No se pudo guardar el registro: {exc.orig}",
        ) from exc
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error de base de datos: {exc}",
        ) from exc


def create_crud_router(
    *,
    model: Any,
    create_schema: Any,
    update_schema: Any,
    read_schema: Any,
    prefix: str,
    tags: list[str],
):
    router = APIRouter(prefix=prefix, tags=tags)

    @router.get("", response_model=list[read_schema])
    def listar(db: Session = Depends(get_db)):
        return db.query(model).all()

    @router.get("/{id}", response_model=read_schema)
    def obtener(id: UUID, db: Session = Depends(get_db)):
        item = db.get(model, id)
        if item is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")
        return item

    @router.post("", response_model=read_schema, status_code=status.HTTP_201_CREATED)
    def crear(payload: create_schema, db: Session = Depends(get_db)):
        item = model(**payload.model_dump(exclude_unset=True))
        db.add(item)
        _commit_or_400(db)
        db.refresh(item)
        return item

    @router.put("/{id}", response_model=read_schema)
    def actualizar(id: UUID, payload: update_schema, db: Session = Depends(get_db)):
        item = db.get(model, id)
        if item is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")

        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(item, field, value)

        _commit_or_400(db)
        db.refresh(item)
        return item

    @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
    def eliminar(id: UUID, db: Session = Depends(get_db)):
        item = db.get(model, id)
        if item is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")

        db.delete(item)
        _commit_or_400(db)
        return None

    return router


def create_geometry_crud_router(
    *,
    model: Any,
    create_schema: Any,
    update_schema: Any,
    read_schema: Any,
    prefix: str,
    tags: list[str],
):
    router = APIRouter(prefix=prefix, tags=tags)
    pk_column = list(model.__table__.primary_key.columns)[0]
    normal_columns = [
        column.name for column in model.__table__.columns if column.name != "geometria"
    ]

    def serialize_row(row):
        obj, geometry_wkt, geometry_geojson = row
        data = {column: getattr(obj, column) for column in normal_columns}
        data["geometria_wkt"] = geometry_wkt
        data["geometria_geojson"] = parse_geojson(geometry_geojson)
        return data

    def geometry_query(db: Session):
        return db.query(
            model,
            func.ST_AsText(model.geometria).label("geometria_wkt"),
            func.ST_AsGeoJSON(model.geometria).label("geometria_geojson"),
        )

    def get_serialized_or_404(db: Session, id: UUID):
        row = geometry_query(db).filter(pk_column == id).first()
        if row is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")
        return serialize_row(row)

    @router.get("", response_model=list[read_schema])
    def listar(db: Session = Depends(get_db)):
        rows = geometry_query(db).all()
        return [serialize_row(row) for row in rows]

    @router.get("/{id}", response_model=read_schema)
    def obtener(id: UUID, db: Session = Depends(get_db)):
        return get_serialized_or_404(db, id)

    @router.post("", response_model=read_schema, status_code=status.HTTP_201_CREATED)
    def crear(payload: create_schema, db: Session = Depends(get_db)):
        data = payload.model_dump(exclude_unset=True)
        geometry_value = data.pop("geometria", None)
        item = model(**data)
        item.geometria = geometry_expression(geometry_value)
        db.add(item)
        _commit_or_400(db)
        db.refresh(item)
        return get_serialized_or_404(db, getattr(item, pk_column.name))

    @router.put("/{id}", response_model=read_schema)
    def actualizar(id: UUID, payload: update_schema, db: Session = Depends(get_db)):
        item = db.get(model, id)
        if item is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")

        data = payload.model_dump(exclude_unset=True)
        if "geometria" in data:
            item.geometria = geometry_expression(data.pop("geometria"))

        for field, value in data.items():
            setattr(item, field, value)

        _commit_or_400(db)
        db.refresh(item)
        return get_serialized_or_404(db, id)

    @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
    def eliminar(id: UUID, db: Session = Depends(get_db)):
        item = db.get(model, id)
        if item is None:
            raise HTTPException(status_code=404, detail="Registro no encontrado")

        db.delete(item)
        _commit_or_400(db)
        return None

    return router
