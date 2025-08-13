import React, { useState } from "react";

export default function PasswordField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  showStrength = false 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    onChange(password);
    
    if (showStrength) {
      // Lógica simples de força da senha
      if (password.length === 0) {
        setStrength("");
      } else if (password.length < 6) {
        setStrength("fraca");
      } else if (password.length < 10) {
        setStrength("média");
      } else {
        setStrength("forte");
      }
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "fraca":
        return "#dc3545";
      case "média":
        return "#ffc107";
      case "forte":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
        {label}
        {required && <span style={{ color: "#dc3545", marginLeft: "4px" }}>*</span>}
      </label>
      
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handlePasswordChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: "100%",
            padding: "12px",
            paddingRight: "40px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      
      {showStrength && strength && (
        <div style={{ marginTop: "5px" }}>
          <span style={{ fontSize: "12px", color: getStrengthColor() }}>
            Força da senha: {strength}
          </span>
        </div>
      )}
    </div>
  );
}
