import {
  ArrowRight,
  Database,
  GitBranch,
  Layers3,
  Server,
  Table2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { entityLinks } from "../data/entityConfigs.js";

const descriptions = {
  Interesados:
    "Personas naturales o juridicas vinculadas con informacion catastral.",
  "Unidades Administrativas":
    "Predios descritos desde informacion administrativa, economica y de vigencia.",
  "Derechos Interesados":
    "Vinculos juridicos entre interesados y unidades administrativas.",
  "Unidades Espaciales":
    "Objetos espaciales con geometria PostGIS en EPSG:9377.",
  "Topografia y Representacion":
    "Elementos capturados o representados para apoyar la descripcion espacial.",
  "Cartografia Catastral":
    "Capas complementarias para contexto, soporte y consulta cartografica.",
};

const technicalItems = [
  ["Base de datos", "bde_ladm_sinic"],
  ["Motor", "PostgreSQL + PostGIS"],
  ["SRID", "EPSG:9377"],
  ["Schemas", "ladm_sinic, catalogos, auditoria"],
  ["Backend", "FastAPI"],
  ["Frontend", "React + Vite"],
];

const conceptFlow = [
  {
    title: "Interesado",
    subtitle: "Persona o entidad",
    table: "interesado",
  },
  {
    title: "DerechoInteresado",
    subtitle: "Vinculo juridico",
    table: "derecho_interesado",
  },
  {
    title: "UnidadAdministrativa",
    subtitle: "Predio administrativo",
    table: "unidad_administrativa",
  },
  {
    title: "UnidadEspacial",
    subtitle: "Geometria del predio",
    table: "unidad_espacial",
  },
  {
    title: "TopografiaRepresentacion",
    subtitle: "Detalle capturado",
    table: "topografia_representacion",
  },
];

export default function ModeloDatosSINIC() {
  return (
    <section className="page content-page">
      <div className="hero compact-hero">
        <div>
          <p className="eyebrow">Modelo de datos SINIC</p>
          <h1>Modelo de Datos SINIC implementado</h1>
          <p>
            Estructura simplificada para gestionar informacion catastral
            mediante entidades administrativas, juridicas y espaciales.
          </p>
        </div>
        <span className="badge">Panel central de navegacion</span>
      </div>

      <div className="model-grid">
        {entityLinks.map((entity) => (
          <article className="model-card" key={entity.to}>
            <div className="card-icon">
              <Table2 size={24} aria-hidden="true" />
            </div>
            <h2>{entity.label}</h2>
            <span className="table-name">{entity.tableName}</span>
            <p>{descriptions[entity.label]}</p>
            <div className="field-list">
              {entity.fields.map((field) => (
                <span key={field}>{field}</span>
              ))}
            </div>
            <Link className="btn btn-primary" to={entity.to}>
              Gestionar
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      <section className="concept-map">
        <div className="section-heading">
          <div>
            <h2>Mapa conceptual del modelo</h2>
            <p>
              Relacion principal entre actores, derechos, predios y componentes
              espaciales.
            </p>
          </div>
        </div>
        <div className="concept-diagram" aria-label="Mapa conceptual SINIC">
          {conceptFlow.map((item, index) => (
            <article className="concept-node" key={item.title}>
              <GitBranch size={20} aria-hidden="true" />
              <span>{item.subtitle}</span>
              <strong>{item.title}</strong>
              <small>{item.table}</small>
              {index < conceptFlow.length - 1 && (
                <b aria-hidden="true" className="concept-connector">
                  -&gt;
                </b>
              )}
            </article>
          ))}
        </div>
        <div className="support-layer">
          <Layers3 size={22} aria-hidden="true" />
          <div>
            <strong>CartografiaCatastral</strong>
            <p>Capa de soporte espacial complementario para consulta y contexto.</p>
          </div>
        </div>
      </section>

      <section className="technical-card">
        <div>
          <p className="eyebrow">Bloque tecnico</p>
          <h2>Configuracion implementada</h2>
          <p>
            Resumen de plataforma para defender la arquitectura y la conexion
            espacial del proyecto.
          </p>
        </div>
        <div className="technical-grid">
          {technicalItems.map(([label, value]) => (
            <article key={label}>
              {label === "Backend" ? (
                <Server size={20} aria-hidden="true" />
              ) : (
                <Database size={20} aria-hidden="true" />
              )}
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
