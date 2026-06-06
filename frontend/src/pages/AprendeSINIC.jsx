import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ExternalLink,
  FileCode2,
  FileText,
  Layers3,
  Network,
  ShieldCheck,
} from "lucide-react";

const sinicCards = [
  {
    title: "Que es SINIC",
    icon: Database,
    text: "Sistema nacional para consolidar y consultar informacion catastral reportada por gestores catastrales.",
  },
  {
    title: "Para que sirve",
    icon: Network,
    text: "Facilita disponibilidad, interoperabilidad y control sobre datos comparables entre territorios.",
  },
  {
    title: "Resolucion 301 de 2025",
    icon: FileText,
    text: "Marco de referencia para adopcion del SINIC y condiciones generales de reporte catastral.",
  },
  {
    title: "LADM_COL SINIC",
    icon: Layers3,
    text: "Modelo de aplicacion que organiza clases, atributos y relaciones para reportar informacion al SINIC.",
  },
  {
    title: "INTERLIS",
    icon: FileCode2,
    text: "Lenguaje para describir modelos de datos geograficos con estructura formal e interoperable.",
  },
  {
    title: "Formato XTF",
    icon: ClipboardCheck,
    text: "Formato de intercambio usado para entregar datos estructurados conforme al modelo definido.",
  },
];

const processSteps = [
  "Captura de datos",
  "Estructuracion bajo modelo",
  "Validacion",
  "Reporte",
  "Consulta y gestion",
];

const keyConcepts = [
  "Unidad administrativa",
  "Unidad espacial",
  "Interesado",
  "Cartografia catastral",
  "Interoperabilidad",
  "Calidad de datos",
];

export default function AprendeSINIC() {
  return (
    <section className="page content-page">
      <div className="hero compact-hero">
        <div>
          <p className="eyebrow">Aprende SINIC</p>
          <h1>Aprende SINIC</h1>
          <p>
            Conceptos basicos sobre el Sistema Nacional de Informacion
            Catastral, LADM_COL SINIC, INTERLIS y XTF.
          </p>
        </div>
        <span className="badge">Reporte catastral estandarizado</span>
      </div>

      <div className="card-grid">
        {sinicCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="info-card hover-card" key={card.title}>
              <Icon size={26} aria-hidden="true" />
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          );
        })}
      </div>

      <section className="detail-band">
        <div>
          <p className="eyebrow">Gestion catastral</p>
          <h2>Importancia para la gestion catastral</h2>
          <p>
            SINIC ayuda a ordenar informacion predial, juridica, economica y
            espacial con reglas comunes. Eso mejora la calidad de datos, permite
            validar reportes y facilita la integracion entre gestores
            catastrales y sistemas nacionales.
          </p>
        </div>
        <div className="quality-list">
          <span>
            <CheckCircle2 size={18} aria-hidden="true" />
            Estandarizacion de informacion
          </span>
          <span>
            <CheckCircle2 size={18} aria-hidden="true" />
            Interoperabilidad institucional
          </span>
          <span>
            <ShieldCheck size={18} aria-hidden="true" />
            Calidad y trazabilidad de datos
          </span>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <h2>Linea de proceso</h2>
          <p>Del dato capturado al reporte y consulta en sistemas nacionales.</p>
        </div>
      </div>
      <div className="timeline">
        {processSteps.map((step, index) => (
          <article className="timeline-step" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
            {index < processSteps.length - 1 && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </article>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>Conceptos clave</h2>
          <p>Terminos que aparecen en el modelo y en la aplicacion.</p>
        </div>
      </div>
      <div className="concept-cloud">
        {keyConcepts.map((concept) => (
          <span className="concept-chip" key={concept}>
            {concept}
          </span>
        ))}
      </div>

      <div className="reference-box">
        <a
          href="https://www.igac.gov.co/index.php/transparencia-y-acceso-a-la-informacion-publica/normograma/resolucion-301-de-2025"
          target="_blank"
          rel="noreferrer"
        >
          Resolucion 301 de 2025 IGAC
          <ExternalLink size={16} aria-hidden="true" />
        </a>
        <a
          href="https://www.igac.gov.co/catastro-multiproposito/reporte-de-informacion-catastral"
          target="_blank"
          rel="noreferrer"
        >
          Reporte de Informacion Catastral
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
