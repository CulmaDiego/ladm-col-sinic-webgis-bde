import {
  ArrowRight,
  Boxes,
  Braces,
  Database,
  GitBranch,
  MousePointerClick,
  Network,
  Table2,
} from "lucide-react";
import { useMemo, useState } from "react";

const explainCards = [
  {
    title: "Que es UML",
    text: "Lenguaje visual para representar sistemas, estructuras y relaciones antes de programar.",
  },
  {
    title: "Diseno de sistemas",
    text: "Ayuda a discutir conceptos, reglas y responsabilidades sin depender todavia del codigo.",
  },
  {
    title: "Diagrama de clases",
    text: "Muestra clases, atributos y relaciones que luego pueden convertirse en tablas.",
  },
  {
    title: "Clases y atributos",
    text: "Una clase representa un concepto y sus atributos describen los datos que almacena.",
  },
  {
    title: "Relaciones entre clases",
    text: "Explican como se conectan las entidades mediante asociaciones o llaves foraneas.",
  },
  {
    title: "Paso a PostgreSQL",
    text: "Las clases se implementan como tablas y los atributos como columnas en la base.",
  },
];

const umlClasses = [
  {
    name: "Interesado",
    table: "ladm_sinic.interesado",
    represents: "Persona natural o juridica vinculada a informacion catastral.",
    relation: "Se conecta con unidades administrativas mediante DerechoInteresado.",
    attributes: [
      "id_interesado",
      "tipo_documento",
      "numero_documento",
      "nombre_razon_social",
    ],
  },
  {
    name: "DerechoInteresado",
    table: "ladm_sinic.derecho_interesado",
    represents: "Relacion juridica entre un interesado y una unidad administrativa.",
    relation: "Actua como tabla puente entre Interesado y UnidadAdministrativa.",
    attributes: [
      "id_derecho",
      "tipo_derecho",
      "porcentaje_participacion",
      "estado",
    ],
  },
  {
    name: "UnidadAdministrativa",
    table: "ladm_sinic.unidad_administrativa",
    represents: "Predio visto desde sus datos administrativos y economicos.",
    relation: "Tiene una o varias unidades espaciales que representan su geometria.",
    attributes: [
      "id_unidad_administrativa",
      "codigo_predial",
      "matricula_inmobiliaria",
      "direccion",
      "avaluo_catastral",
    ],
  },
  {
    name: "UnidadEspacial",
    table: "ladm_sinic.unidad_espacial",
    represents: "Objeto espacial del predio o unidad territorial.",
    relation: "Se relaciona con topografia y representacion mediante su geometria.",
    attributes: [
      "id_unidad_espacial",
      "tipo_unidad_espacial",
      "area_calculada",
      "geometria",
    ],
  },
  {
    name: "TopografiaRepresentacion",
    table: "ladm_sinic.topografia_representacion",
    represents: "Elementos levantados o representados sobre una unidad espacial.",
    relation: "Complementa la unidad espacial con elementos de captura o soporte.",
    attributes: [
      "id_topografia",
      "tipo_elemento",
      "metodo_captura",
      "geometria",
    ],
  },
  {
    name: "CartografiaCatastral",
    table: "ladm_sinic.cartografia_catastral",
    represents: "Capa de soporte espacial complementaria para contexto catastral.",
    relation: "Aporta referencia cartografica sin ser tabla puente juridica.",
    attributes: ["id_cartografia", "tipo_elemento", "codigo", "geometria"],
  },
];

const conceptSteps = [
  "Entidad del mundo real",
  "Clase UML",
  "Tabla relacional",
  "Registro en PostgreSQL/PostGIS",
];

const comparisonRows = [
  ["Clase", "Tabla", "interesado"],
  ["Atributo", "Columna", "numero_documento"],
  ["Relacion", "Llave foranea", "id_unidad_administrativa"],
  ["Objeto espacial", "Geometria PostGIS", "geometria"],
];

const relationFlow = [
  {
    name: "Interesado",
    label: "Actor catastral",
    table: "interesado",
  },
  {
    name: "DerechoInteresado",
    label: "Tabla puente",
    table: "derecho_interesado",
  },
  {
    name: "UnidadAdministrativa",
    label: "Predio administrativo",
    table: "unidad_administrativa",
  },
  {
    name: "UnidadEspacial",
    label: "Geometria predial",
    table: "unidad_espacial",
  },
  {
    name: "TopografiaRepresentacion",
    label: "Detalle espacial",
    table: "topografia_representacion",
  },
];

export default function AprendeUML() {
  const [selectedClass, setSelectedClass] = useState("Interesado");
  const currentClass = useMemo(
    () => umlClasses.find((item) => item.name === selectedClass),
    [selectedClass],
  );

  return (
    <section className="page content-page">
      <div className="hero compact-hero">
        <div>
          <p className="eyebrow">Aprende UML</p>
          <h1>UML aplicado al modelo de datos catastral</h1>
          <p>
            UML permite representar entidades, atributos y relaciones antes de
            implementar la base de datos.
          </p>
        </div>
        <span className="badge">Diseno conceptual del sistema</span>
      </div>

      <div className="card-grid">
        {explainCards.map((card) => (
          <article className="info-card hover-card" key={card.title}>
            <Network size={24} aria-hidden="true" />
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <section className="diagram-section">
        <div className="section-heading">
          <div>
            <h2>Diagrama UML interactivo</h2>
            <p>
              Selecciona una clase para ver su tabla equivalente, atributos y
              papel dentro del modelo catastral.
            </p>
          </div>
          <span className="badge muted">
            <MousePointerClick size={15} aria-hidden="true" />
            Clic para inspeccionar
          </span>
        </div>

        <div className="uml-interactive">
          <div className="uml-class-grid">
            {umlClasses.map((item) => (
              <button
                className={`uml-node ${item.name === selectedClass ? "active" : ""}`}
                type="button"
                key={item.name}
                onClick={() => setSelectedClass(item.name)}
              >
                <strong>{item.name}</strong>
                <span>{item.table}</span>
                <ul>
                  {item.attributes.slice(0, 4).map((attribute) => (
                    <li key={attribute}>{attribute}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <aside className="detail-panel">
            <Braces size={28} aria-hidden="true" />
            <h2>{currentClass.name}</h2>
            <p>{currentClass.represents}</p>
            <dl>
              <div>
                <dt>Tabla PostgreSQL</dt>
                <dd>{currentClass.table}</dd>
              </div>
              <div>
                <dt>Relacion catastral</dt>
                <dd>{currentClass.relation}</dd>
              </div>
            </dl>
            <div className="attribute-list">
              {currentClass.attributes.map((attribute) => (
                <span key={attribute}>{attribute}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <h2>Del concepto al dato</h2>
          <p>Ruta conceptual para pasar de la realidad al registro espacial.</p>
        </div>
      </div>
      <div className="process-grid">
        {conceptSteps.map((step, index) => (
          <article className="process-card" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
            {index < conceptSteps.length - 1 && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </article>
        ))}
      </div>

      <div className="comparison-card">
        <div className="section-heading">
          <div>
            <h2>Comparacion UML y base de datos</h2>
            <p>Equivalencias usadas para defender el modelo implementado.</p>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table compact-table">
            <thead>
              <tr>
                <th>Concepto UML</th>
                <th>Equivalente en BD</th>
                <th>Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]}>
                  <td>
                    <Boxes size={16} aria-hidden="true" />
                    {row[0]}
                  </td>
                  <td>
                    <Table2 size={16} aria-hidden="true" />
                    {row[1]}
                  </td>
                  <td>
                    <Database size={16} aria-hidden="true" />
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="relationship-card">
        <div className="section-heading">
          <div>
            <h2>Relaciones visuales del modelo</h2>
            <p>
              El flujo muestra como el actor catastral llega hasta la geometria
              y sus elementos de representacion.
            </p>
          </div>
        </div>

        <div className="relationship-diagram" aria-label="Relaciones UML del modelo">
          {relationFlow.map((item, index) => (
            <article className="relation-node" key={item.name}>
              <GitBranch size={20} aria-hidden="true" />
              <span>{item.label}</span>
              <strong>{item.name}</strong>
              <small>{item.table}</small>
              {index < relationFlow.length - 1 && (
                <b aria-hidden="true" className="relation-connector">
                  -&gt;
                </b>
              )}
            </article>
          ))}
        </div>

        <div className="support-diagram">
          <Database size={22} aria-hidden="true" />
          <div>
            <strong>CartografiaCatastral</strong>
            <p>
              Capa complementaria: no reemplaza la relacion juridica, pero
              aporta contexto espacial para consulta y control cartografico.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
