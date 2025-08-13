import React from "react";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  const baseClasses = "button";
  
  const variantClasses = {
    primary: "button-primary",
    secondary: "button-secondary",
    outline: "button-outline",
    danger: "button-danger",
  };

  const classes = `${baseClasses} ${variantClasses[variant] || ""} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
