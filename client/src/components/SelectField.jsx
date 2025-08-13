import React from "react";

export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  id,
  ...props
}) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span>*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
} 