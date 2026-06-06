import { BookOpen, CheckCircle2, Database, Server, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api, API_URL } from "../api/api.js";
import { entityLinks } from "../data/entityConfigs.js";

export default function Home() {
  const [health, setHealth] = useState({ status: "checking" });

  useEffect(() => {
    api
      .get("/health")
      .then((response) => setHealth(response.data))
      .catch(() => setHealth({ status: "error", database: "disconnected" }));
  }, []);

  const connected = health.status === "ok";

  return (
    <section className="home-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Bases de Datos Espaciales</p>
          <h1>ladm-col-sinic-webgis-bde</h1>
          <p>
            Aplicacion academica para gestionar informacion catastral con
            FastAPI, React, PostgreSQL y PostGIS.
          </p>
        </div>
        <div className={`status-pill ${connected ? "ok" : "error"}`}>
          {connected ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <XCircle size={18} aria-hidden="true" />
          )}
          <span>{connected ? "Base conectada" : "Base sin conexion"}</span>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <Database size={28} aria-hidden="true" />
          <h2>Modelo LADM_COL SINIC</h2>
          <p>
            Seis entidades principales organizan interesados, predios, derechos,
            geometria, topografia y cartografia catastral.
          </p>
        </article>
        <article className="summary-card">
          <Server size={28} aria-hidden="true" />
          <h2>API espacial</h2>
          <p>
            El backend expone CRUD REST y convierte geometrias WKT o GeoJSON con
            PostGIS en SRID EPSG:9377.
          </p>
        </article>
        <article className="summary-card">
          <BookOpen size={28} aria-hidden="true" />
          <h2>Contenido academico</h2>
          <p>
            Las secciones Aprende SINIC y Aprende UML resumen conceptos clave
            para presentar el proyecto en clase.
          </p>
        </article>
      </div>

      <div className="section-heading">
        <h2>Entidades implementadas</h2>
        <span>API: {API_URL}</span>
      </div>
      <div className="entity-grid">
        {entityLinks.map((entity) => (
          <Link className="entity-card" to={entity.to} key={entity.to}>
            <span>{entity.label}</span>
            <p>{entity.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
