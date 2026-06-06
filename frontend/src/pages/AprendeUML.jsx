export default function AprendeUML() {
  return (
    <section className="content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Aprende UML</p>
          <h1>UML aplicado al modelo de datos</h1>
          <p>
            Conceptos sencillos para explicar como se pasa de entidades del
            dominio catastral a tablas relacionadas.
          </p>
        </div>
      </div>

      <div className="content-grid">
        <article className="info-card">
          <h2>Que es UML</h2>
          <p>
            UML es un lenguaje visual usado para representar sistemas,
            estructuras, comportamientos y relaciones antes de implementarlos.
          </p>
        </article>
        <article className="info-card">
          <h2>Diseno de sistemas</h2>
          <p>
            En bases de datos ayuda a identificar entidades, atributos y reglas
            de asociacion. Eso facilita construir un modelo relacional claro.
          </p>
        </article>
        <article className="info-card">
          <h2>Diagrama de clases</h2>
          <p>
            Un diagrama de clases muestra clases, atributos y relaciones. En el
            proyecto, cada clase principal puede entenderse como una tabla.
          </p>
        </article>
        <article className="info-card">
          <h2>Clase y atributos</h2>
          <p>
            Una clase representa un concepto del dominio. Sus atributos son los
            datos que describen ese concepto, como codigo predial, direccion o
            tipo de documento.
          </p>
        </article>
      </div>

      <div className="uml-board">
        <div className="uml-class">
          <h2>Interesado</h2>
          <ul>
            <li>tipo_documento</li>
            <li>numero_documento</li>
            <li>nombre_razon_social</li>
          </ul>
        </div>
        <div className="uml-relation">
          <span>derecho_interesado</span>
          <p>Un interesado puede vincularse a una o varias unidades.</p>
        </div>
        <div className="uml-class">
          <h2>UnidadAdministrativa</h2>
          <ul>
            <li>codigo_predial</li>
            <li>matricula_inmobiliaria</li>
            <li>direccion</li>
            <li>avaluo_catastral</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
