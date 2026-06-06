import { AlertCircle, CheckCircle2, Download, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { api } from "../api/api.js";

function getFilename(headers) {
  const disposition = headers["content-disposition"];
  const match = disposition?.match(/filename="?([^"]+)"?/i);
  return match?.[1] || "bde_ladm_sinic.backup";
}

function getBackupError(error) {
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  return error.message || "No fue posible completar la operacion.";
}

export default function BackupControls() {
  const fileInputRef = useRef(null);
  const [busyAction, setBusyAction] = useState(null);
  const [status, setStatus] = useState(null);

  const busy = Boolean(busyAction);

  const handleDownload = async () => {
    setBusyAction("download");
    setStatus(null);

    try {
      const response = await api.get("/api/backup", {
        responseType: "blob",
      });
      const filename = getFilename(response.headers);
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setStatus({ type: "success", text: `Backup generado: ${filename}` });
    } catch (error) {
      setStatus({ type: "error", text: getBackupError(error) });
    } finally {
      setBusyAction(null);
    }
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleRestore = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".backup")) {
      setStatus({
        type: "error",
        text: "Seleccione un archivo .backup generado por la aplicacion.",
      });
      return;
    }

    const confirmed = window.confirm(
      "Esta accion reemplaza los datos actuales de las tablas del proyecto. Desea restaurar el backup seleccionado?",
    );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setBusyAction("restore");
    setStatus(null);

    try {
      const response = await api.post("/api/backup/restore", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus({
        type: "success",
        text: response.data?.message || "Backup restaurado correctamente.",
      });
    } catch (error) {
      setStatus({ type: "error", text: getBackupError(error) });
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <section className="backup-panel">
      <div>
        <p className="eyebrow">Respaldo de base de datos</p>
        <h2>Backup y restore</h2>
        <p>
          Descarga un archivo `.backup` con los datos del proyecto o restaura un
          respaldo generado desde esta aplicacion.
        </p>
      </div>

      <div className="backup-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleDownload}
          disabled={busy}
          title="Descargar backup"
        >
          <Download size={18} aria-hidden="true" />
          {busyAction === "download" ? "Generando..." : "Descargar backup"}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleRestoreClick}
          disabled={busy}
          title="Restaurar backup"
        >
          <Upload size={18} aria-hidden="true" />
          {busyAction === "restore" ? "Restaurando..." : "Restaurar backup"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".backup"
          onChange={handleRestore}
          hidden
        />
      </div>

      {status && (
        <div className={`notice ${status.type}`} role="status">
          {status.type === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          <span>{status.text}</span>
        </div>
      )}
    </section>
  );
}
