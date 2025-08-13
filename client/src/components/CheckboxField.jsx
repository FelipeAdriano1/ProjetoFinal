import React from "react";

export default function CheckboxField({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  ...props
}) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
} 