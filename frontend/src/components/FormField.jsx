export default function FormField({ field, value, onChange, error, options }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? "",
    onChange,
    placeholder: field.placeholder || "",
  };
  const optionItems = options || field.options || [];
  const shouldRenderSelect = field.type === "select" || field.relation;

  return (
    <label
      className={`form-field ${field.type === "textarea" ? "span-wide" : ""} ${
        error ? "has-error" : ""
      }`}
      htmlFor={field.name}
    >
      <span>{field.label}</span>
      {field.type === "textarea" ? (
        <textarea {...commonProps} rows={field.rows || 4} />
      ) : shouldRenderSelect ? (
        <select {...commonProps}>
          <option value="">{field.placeholder || "Seleccionar"}</option>
          {optionItems.map((option) => (
            <option
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option.label}
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
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
