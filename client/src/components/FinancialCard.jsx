import React from "react";

export default function FinancialCard({ title, value, formatCurrency, type }) {
  const getIcon = () => {
    switch (type) {
      case "balance":
        return "💰";
      case "income":
        return "📈";
      case "expense":
        return "📉";
      case "savings":
        return "🏦";
      default:
        return "💰";
    }
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666" }}>{title}</p>
          <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>{formatCurrency(value)}</p>
        </div>
        <div style={{ fontSize: "24px", color: "#007bff" }}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}
