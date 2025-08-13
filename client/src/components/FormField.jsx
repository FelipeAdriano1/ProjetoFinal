import React from "react";

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  id,
  ...props
}) {
  const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div>
      <label htmlFor={fieldId}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}