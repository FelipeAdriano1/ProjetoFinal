import React from "react";

export default function Alert({ type = "info", message, onClose }) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "ℹ️";
    }
  };

  const getStyles = () => {
    const baseStyles = {
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "14px"
    };

    switch (type) {
      case "success":
        return {
          ...baseStyles,
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb"
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb"
        };
      case "warning":
        return {
          ...baseStyles,
          backgroundColor: "#fff3cd",
          color: "#856404",
          border: "1px solid #ffeaa7"
        };
      case "info":
        return {
          ...baseStyles,
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          border: "1px solid #bee5eb"
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          border: "1px solid #bee5eb"
        };
    }
  };

  return (
    <div style={getStyles()}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "16px" }}>{getIcon()}</span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: "inherit",
            padding: "0",
            marginLeft: "10px"
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
