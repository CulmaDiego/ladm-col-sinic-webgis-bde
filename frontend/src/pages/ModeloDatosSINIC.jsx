import { ArrowRight, Database } from "lucide-react";
import { Link } from "react-router-dom";

import { entityLinks } from "../data/entityConfigs.js";

const descriptions = {
  Interesados:
    "Representa personas naturales o juridicas relacionadas con informacion catastral.",
  "Unidades Administrativas":
    "Describe el predio desde su informacion administrativa, economica y de vigencia.",
  "Derechos Interesados":
    "Relaciona interesados con unidades administrativas y registra el tipo de derecho.",
  "Unidades Espaciales":
    "Guarda la geometria del objeto espacial asociado al predio en EPSG:9377.",
  "Topografia y Representacion":
    "Registra elementos capturados en campo o por fuentes cartograficas.",
  "Cartografia Catastral":
    "Almacena elementos cartograficos de apoyo como sectores, vias o manzanas.",
};

export default function ModeloDatosSINIC() {
  return (
    <section className="content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Modelo de datos SINIC</p>
          <h1>Entidades implementadas</h1>
          <p>
            Vista conceptual de las tablas incluidas en el proyecto y acceso
            directo a sus formularios CRUD.
          </p>
        </div>
      </div>

      <div className="model-grid">
        {entityLinks.map((entity) => (
          <article className="model-card" key={entity.to}>
            <Database size={24} aria-hidden="true" />
            <h2>{entity.label}</h2>
            <p>{descriptions[entity.label]}</p>
            <Link className="button inline" to={entity.to}>
              Abrir CRUD
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
