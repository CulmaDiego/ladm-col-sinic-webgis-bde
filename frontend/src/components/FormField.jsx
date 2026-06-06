export default function FormField({ field, value, onChange }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? "",
    onChange,
    placeholder: field.placeholder || "",
  };

  return (
    <label
      className={`form-field ${field.type === "textarea" ? "span-wide" : ""}`}
      htmlFor={field.name}
    >
      <span>{field.label}</span>
      {field.type === "textarea" ? (
        <textarea {...commonProps} rows={field.rows || 4} />
      ) : field.type === "select" ? (
        <select {...commonProps}>
          <option value="">Seleccionar</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...commonProps}
          type={field.type || "text"}
          step={field.type === "number" ? "any" : undefined}
        />
      )}
      {field.help && <small>{field.help}</small>}
    </label>
  );
}
