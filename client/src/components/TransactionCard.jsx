import React from "react";

export default function TransactionCard({ transaction, formatCurrency }) {
  const isIncome = transaction.type === "income";

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "15px", 
      marginBottom: "10px", 
      backgroundColor: "#f8f9fa", 
      borderRadius: "8px",
      border: "1px solid #dee2e6"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ 
          padding: "8px", 
          borderRadius: "50%", 
          backgroundColor: isIncome ? "#d4edda" : "#f8d7da",
          color: isIncome ? "#155724" : "#721c24"
        }}>
          {isIncome ? "📈" : "📉"}
        </div>
        <div>
          <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>{transaction.description}</p>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>
      <div>
        <p style={{ 
          margin: "0", 
          fontWeight: "bold",
          color: isIncome ? "#28a745" : "#dc3545"
        }}>
          {formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
}
