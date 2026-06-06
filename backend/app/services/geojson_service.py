import json
from typing import Any

from sqlalchemy import func


def geometry_expression(value: Any, srid: int = 9377):
    """Convierte WKT o GeoJSON simple en una expresion PostGIS."""
    if value is None:
        return None

    if isinstance(value, str):
        cleaned = value.strip()
        if not cleaned:
            return None
        if cleaned.startswith("{") or cleaned.startswith("["):
            return func.ST_SetSRID(func.ST_GeomFromGeoJSON(cleaned), srid)
        return func.ST_GeomFromText(cleaned, srid)

    if isinstance(value, (dict, list)):
        return func.ST_SetSRID(func.ST_GeomFromGeoJSON(json.dumps(value)), srid)

    raise ValueError("La geometria debe enviarse como WKT, GeoJSON o null.")


def parse_geojson(geojson_text: str | None):
    if not geojson_text:
        return None
    return json.loads(geojson_text)
