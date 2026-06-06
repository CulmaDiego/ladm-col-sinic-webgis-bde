import {
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Layers3,
  MapPinned,
  Server,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api, API_URL } from "../api/api.js";
import BackupControls from "../components/BackupControls.jsx";

const quickCards = [
  {
    title: "Aprende SINIC",
    description: "Conceptos de reporte, estandarizacion y modelo catastral.",
    to: "/aprende-sinic",
    icon: BookOpen,
  },
  {
    title: "Aprende UML",
    description: "Entidades, atributos y relaciones antes de llegar a la BD.",
    to: "/aprende-uml",
    icon: Code2,
  },
  {
    title: "Modelo de Datos",
    description: "Mapa de entidades y acceso a los modulos CRUD.",
    to: "/modelo-datos-sinic",
    icon: Boxes,
  },
  {
    title: "CRUD Catastral",
    description: "Gestiona interesados, predios, derechos y geometrias.",
    to: "/interesados",
    icon: FileText,
  },
  {
    title: "Base Espacial",
    description: "PostgreSQL + PostGIS con geometrias en EPSG:9377.",
    to: "/unidades-espaciales",
    icon: MapPinned,
  },
];

const architecture = [
  { label: "Frontend React", detail: "Interfaz Vite", icon: Code2 },
  { label: "Backend FastAPI", detail: "API REST CRUD", icon: Server },
  { label: "PostgreSQL + PostGIS", detail: "Datos espaciales", icon: Database },
  { label: "Modelo LADM_COL SINIC", detail: "Estructura catastral", icon: Layers3 },
];

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
    <section className="page home-page">
      <div className="hero hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Bases de Datos Espaciales</p>
          <h1>LADM_COL SINIC WebGIS BDE</h1>
          <p>
            Aplicacion web para gestionar informacion catastral conforme al
            enfoque LADM_COL SINIC, integrando PostgreSQL, PostGIS, FastAPI y
            React.
          </p>
          <div className="badge-row">
            <span className="badge">PostgreSQL + PostGIS</span>
            <span className="badge">FastAPI</span>
            <span className="badge">React + Vite</span>
            <span className="badge">Modelo catastral</span>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/modelo-datos-sinic">
              Explorar modelo
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-secondary" to="/interesados">
              Abrir CRUD
            </Link>
          </div>
        </div>

        <aside className="hero-card system-card">
          <div className={`status-pill ${connected ? "ok" : "error"}`}>
            {connected ? (
              <CheckCircle2 size={18} aria-hidden="true" />
            ) : (
              <XCircle size={18} aria-hidden="true" />
            )}
            <span>{connected ? "Base conectada" : "Base sin conexion"}</span>
          </div>
          <div>
            <span className="metric-label">API configurada</span>
            <strong>{API_URL}</strong>
          </div>
          <div className="mini-terminal">
            <span>GET /health</span>
            <strong>{connected ? "database: connected" : "database: disconnected"}</strong>
          </div>
        </aside>
      </div>

      <div className="stat-grid">
        <article className="stat-card">
          <Boxes size={22} aria-hidden="true" />
          <div>
            <span>Entidades principales</span>
            <strong>6</strong>
          </div>
        </article>
        <article className="stat-card">
          <FileText size={22} aria-hidden="true" />
          <div>
            <span>Modulos CRUD</span>
            <strong>6</strong>
          </div>
        </article>
        <article className="stat-card">
          <MapPinned size={22} aria-hidden="true" />
          <div>
            <span>SRID de trabajo</span>
            <strong>EPSG:9377</strong>
          </div>
        </article>
        <article className="stat-card">
          <Database size={22} aria-hidden="true" />
          <div>
            <span>Base espacial</span>
            <strong>PostGIS</strong>
          </div>
        </article>
      </div>

      <BackupControls />

      <div className="section-heading">
        <div>
          <h2>Acciones rapidas</h2>
          <p>Accede a aprendizaje, modelo de datos y gestion catastral.</p>
        </div>
      </div>
      <div className="quick-actions">
        {quickCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link className="action-card" to={card.to} key={card.title}>
              <Icon size={24} aria-hidden="true" />
              <span>{card.title}</span>
              <p>{card.description}</p>
              <strong>
                Abrir
                <ArrowRight size={16} aria-hidden="true" />
              </strong>
            </Link>
          );
        })}
      </div>

      <div className="section-heading">
        <div>
          <h2>Arquitectura del sistema</h2>
          <p>Flujo funcional desde la interfaz hasta el modelo espacial.</p>
        </div>
      </div>
      <div className="architecture-flow">
        {architecture.map((item, index) => {
          const Icon = item.icon;
          return (
            <article className="architecture-step" key={item.label}>
              <Icon size={26} aria-hidden="true" />
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
              {index < architecture.length - 1 && (
                <span className="flow-arrow" aria-hidden="true">
                  -&gt;
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
