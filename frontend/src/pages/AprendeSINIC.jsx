import { ExternalLink } from "lucide-react";

export default function AprendeSINIC() {
  return (
    <section className="content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Aprende SINIC</p>
          <h1>SINIC y reporte de informacion catastral</h1>
          <p>
            Conceptos base para entender por que el proyecto organiza los datos
            catastrales con un modelo estandarizado.
          </p>
        </div>
      </div>

      <div className="content-grid">
        <article className="info-card">
          <h2>Que es SINIC</h2>
          <p>
            El Sistema Nacional de Informacion Catastral es una plataforma de
            referencia para consolidar y consultar informacion catastral
            reportada por los gestores catastrales en Colombia.
          </p>
        </article>
        <article className="info-card">
          <h2>Para que sirve</h2>
          <p>
            Sirve para mejorar la disponibilidad, interoperabilidad y control de
            la informacion catastral. Su valor esta en que permite trabajar con
            datos comparables entre territorios y entidades.
          </p>
        </article>
        <article className="info-card">
          <h2>Resolucion 301 de 2025</h2>
          <p>
            La Resolucion IGAC 301 del 4 de marzo de 2025 adopta el SINIC y
            define condiciones para el reporte de informacion por parte de los
            gestores catastrales. En este proyecto se usa como contexto general,
            no como transcripcion juridica.
          </p>
        </article>
        <article className="info-card">
          <h2>Reporte catastral</h2>
          <p>
            El reporte busca que la informacion predial, juridica, economica y
            espacial sea entregada con estructura comun. Esto facilita validar,
            cargar y analizar informacion catastral a escala nacional.
          </p>
        </article>
        <article className="info-card">
          <h2>LADM_COL SINIC</h2>
          <p>
            LADM_COL SINIC V1.0 es un modelo de aplicacion orientado al reporte
            al SINIC. Ayuda a organizar clases, atributos y relaciones para que
            los datos catastrales mantengan una semantica comun.
          </p>
        </article>
        <article className="info-card">
          <h2>INTERLIS y XTF</h2>
          <p>
            INTERLIS permite describir modelos de datos geograficos y XTF es un
            formato de intercambio usado para entregar informacion estructurada.
            En conjunto apoyan la estandarizacion del reporte catastral.
          </p>
        </article>
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
