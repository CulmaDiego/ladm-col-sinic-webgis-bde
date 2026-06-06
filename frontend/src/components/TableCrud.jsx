import {
  AlertCircle,
  Braces,
  CheckCircle2,
  Database,
  FileText,
  Layers,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { api } from "../api/api.js";
import FormField from "./FormField.jsx";

function buildInitialForm(fields) {
  return fields.reduce((values, field) => {
    values[field.name] = "";
    return values;
  }, {});
}

function normalizePayload(values, fields) {
  return fields.reduce((payload, field) => {
    const rawValue = values[field.name];

    if (rawValue === "") {
      payload[field.name] = null;
      return payload;
    }

    payload[field.name] =
      field.type === "number" ? Number(rawValue) : rawValue;
    return payload;
  }, {});
}

function getErrorMessage(error) {
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (detail) {
    return JSON.stringify(detail);
  }
  return error.message || "No fue posible completar la operacion.";
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Sin dato";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

export default function TableCrud({ config }) {
  const initialForm = useMemo(() => buildInitialForm(config.fields), [config]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) {
      return rows;
    }

    return rows.filter((row) =>
      config.tableColumns.some((column) =>
        displayValue(row[column.key]).toLowerCase().includes(normalizedTerm),
      ),
    );
  }, [config.tableColumns, rows, searchTerm]);

  const populatedCount = useMemo(() => {
    if (rows.length === 0) {
      return 0;
    }

    return rows.reduce((count, row) => {
      const hasCoreData = config.keyFields?.some((field) => row[field]);
      return hasCoreData ? count + 1 : count;
    }, 0);
  }, [config.keyFields, rows]);

  const loadRows = async ({ preserveMessage = false } = {}) => {
    setLoading(true);
    try {
      const response = await api.get(config.endpoint);
      setRows(response.data);
      if (!preserveMessage) {
        setMessage(null);
      }
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm(initialForm);
    setEditingId(null);
    loadRows();
  }, [initialForm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = normalizePayload(form, config.fields);

    try {
      if (editingId) {
        await api.put(`${config.endpoint}/${editingId}`, payload);
        setMessage({ type: "success", text: "Registro actualizado." });
      } else {
        await api.post(config.endpoint, payload);
        setMessage({ type: "success", text: "Registro creado." });
      }
      resetForm();
      await loadRows({ preserveMessage: true });
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    }
  };

  const handleEdit = (row) => {
    const values = config.fields.reduce((nextForm, field) => {
      const sourceValue =
        field.name === "geometria" ? row.geometria_wkt : row[field.name];
      nextForm[field.name] = sourceValue ?? "";
      return nextForm;
    }, {});
    setForm(values);
    setEditingId(row[config.idField]);
    setMessage({ type: "success", text: "Registro cargado para edicion." });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (row) => {
    const id = row[config.idField];
    const confirmed = window.confirm("Desea eliminar este registro?");
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`${config.endpoint}/${id}`);
      setMessage({ type: "success", text: "Registro eliminado." });
      await loadRows({ preserveMessage: true });
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    }
  };

  return (
    <section className="crud-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Modulo CRUD academico</p>
          <h1>{config.pageTitle || config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={loadRows}
          title="Actualizar datos"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Actualizar
        </button>
      </div>

      <div className="stat-grid compact">
        <article className="stat-card">
          <Database size={20} aria-hidden="true" />
          <div>
            <span>Tabla PostgreSQL</span>
            <strong>{config.tableName}</strong>
          </div>
        </article>
        <article className="stat-card">
          <FileText size={20} aria-hidden="true" />
          <div>
            <span>Tipo de informacion</span>
            <strong>{config.infoType}</strong>
          </div>
        </article>
        <article className="stat-card">
          <Layers size={20} aria-hidden="true" />
          <div>
            <span>Registros cargados</span>
            <strong>{loading ? "Cargando" : rows.length}</strong>
          </div>
        </article>
        <article className="stat-card">
          <CheckCircle2 size={20} aria-hidden="true" />
          <div>
            <span>Datos con campos clave</span>
            <strong>{populatedCount}</strong>
          </div>
        </article>
      </div>

      {message && (
        <div className={`notice ${message.type}`} role="status">
          {message.type === "error" ? (
            <AlertCircle size={18} aria-hidden="true" />
          ) : (
            <CheckCircle2 size={18} aria-hidden="true" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="crud-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-title">
            <Plus size={20} aria-hidden="true" />
            <div>
              <h2>{editingId ? "Editar registro" : "Crear registro"}</h2>
              <p>
                {editingId
                  ? "Modifica los campos necesarios y guarda los cambios."
                  : "Registra un nuevo elemento sin cambiar la estructura de la API."}
              </p>
            </div>
          </div>
          <div className="form-grid">
            {config.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
          {config.hasGeometry && (
            <div className="geometry-help">
              <Braces size={18} aria-hidden="true" />
              <div>
                <strong>Geometria en WKT con SRID EPSG:9377</strong>
                <p>
                  Ejemplos: POLYGON((5000000 2000000, 5000010 2000000,
                  5000010 2000012, 5000000 2000012, 5000000 2000000)) y
                  POINT(5000005 2000005).
                </p>
              </div>
            </div>
          )}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" title="Guardar">
              <Save size={18} aria-hidden="true" />
              {editingId ? "Guardar cambios" : "Crear registro"}
            </button>
            {editingId && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={resetForm}
                title="Cancelar edicion"
              >
                <X size={18} aria-hidden="true" />
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="table-panel">
          <div className="table-header">
            <div>
              <h2>Registros</h2>
              <span>
                {loading
                  ? "Consultando API..."
                  : `${filteredRows.length} de ${rows.length} registros`}
              </span>
            </div>
            <label className="search-box" htmlFor={`${config.idField}-search`}>
              <Search size={17} aria-hidden="true" />
              <input
                id={`${config.idField}-search`}
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar en la tabla"
              />
            </label>
          </div>
          <div className="table-scroll">
            <table className="data-table">
            <thead>
              <tr>
                {config.tableColumns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={config.tableColumns.length + 1}>
                    <div className="empty-state">
                      <FileText size={24} aria-hidden="true" />
                      <strong>
                        {rows.length === 0
                          ? "No hay registros para mostrar."
                          : "No se encontraron coincidencias."}
                      </strong>
                      <span>
                        {rows.length === 0
                          ? "Crea un registro o verifica la carga desde la API."
                          : "Ajusta el texto de busqueda para ver mas resultados."}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row[config.idField]}>
                    {config.tableColumns.map((column) => (
                      <td
                        key={column.key}
                        className={
                          column.key.includes("id_") ||
                          column.key.includes("geometria")
                            ? "cell-long"
                            : undefined
                        }
                      >
                        {displayValue(row[column.key])}
                      </td>
                    ))}
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          type="button"
                          onClick={() => handleEdit(row)}
                          title="Editar"
                        >
                          <Pencil size={17} aria-hidden="true" />
                        </button>
                        <button
                          className="icon-button danger"
                          type="button"
                          onClick={() => handleDelete(row)}
                          title="Eliminar"
                        >
                          <Trash2 size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
