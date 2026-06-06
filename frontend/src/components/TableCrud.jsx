import {
  AlertCircle,
  CheckCircle2,
  Pencil,
  Plus,
  RefreshCw,
  Save,
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

  const loadRows = async () => {
    setLoading(true);
    try {
      const response = await api.get(config.endpoint);
      setRows(response.data);
      setMessage(null);
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
      await loadRows();
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
      await loadRows();
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    }
  };

  return (
    <section className="crud-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CRUD academico</p>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        <button
          className="button secondary"
          type="button"
          onClick={loadRows}
          title="Actualizar datos"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Actualizar
        </button>
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

      <form className="crud-form" onSubmit={handleSubmit}>
        <div className="form-title">
          <Plus size={20} aria-hidden="true" />
          <h2>{editingId ? "Editar registro" : "Crear registro"}</h2>
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
        <div className="form-actions">
          <button className="button primary" type="submit" title="Guardar">
            <Save size={18} aria-hidden="true" />
            {editingId ? "Guardar cambios" : "Crear"}
          </button>
          {editingId && (
            <button
              className="button secondary"
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
          <h2>Registros</h2>
          <span>{loading ? "Cargando..." : `${rows.length} registros`}</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {config.tableColumns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={config.tableColumns.length + 1}>
                    No hay registros para mostrar.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
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
    </section>
  );
}
