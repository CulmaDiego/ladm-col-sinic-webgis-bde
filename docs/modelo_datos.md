# Modelo de datos implementado

El proyecto implementa una version academica y simplificada de entidades
relacionadas con el enfoque LADM_COL SINIC V1.0.

```mermaid
erDiagram
    INTERESADO ||--o{ DERECHO_INTERESADO : registra
    UNIDAD_ADMINISTRATIVA ||--o{ DERECHO_INTERESADO : vincula
    UNIDAD_ADMINISTRATIVA ||--o{ UNIDAD_ESPACIAL : representa
    UNIDAD_ESPACIAL ||--o{ TOPOGRAFIA_REPRESENTACION : describe

    INTERESADO {
        uuid id_interesado PK
        string tipo_documento
        string numero_documento
        string nombre_razon_social
    }

    UNIDAD_ADMINISTRATIVA {
        uuid id_unidad_administrativa PK
        string codigo_predial
        string matricula_inmobiliaria
        numeric avaluo_catastral
    }

    DERECHO_INTERESADO {
        uuid id_derecho PK
        uuid id_interesado FK
        uuid id_unidad_administrativa FK
        numeric porcentaje_participacion
    }

    UNIDAD_ESPACIAL {
        uuid id_unidad_espacial PK
        uuid id_unidad_administrativa FK
        geometry geometria
    }

    TOPOGRAFIA_REPRESENTACION {
        uuid id_topografia PK
        uuid id_unidad_espacial FK
        geometry geometria
    }

    CARTOGRAFIA_CATASTRAL {
        uuid id_cartografia PK
        string tipo_elemento
        geometry geometria
    }
```

## Entidades

- **Interesado:** persona natural o juridica relacionada con el predio.
- **Unidad Administrativa:** informacion administrativa, economica y de vigencia
  del predio.
- **Derecho Interesado:** asociacion entre interesado, unidad administrativa y
  tipo de derecho.
- **Unidad Espacial:** geometria predial o unidad territorial en EPSG:9377.
- **Topografia y Representacion:** elementos espaciales obtenidos de captura o
  representacion cartografica.
- **Cartografia Catastral:** capas de apoyo como manzanas, vias, sectores o
  veredas.
