import React from "react";
import TransactionForm from "../components/TransactionForm";
import Navigation from "../components/Navigation";
import { CATEGORIAS_DESPESA } from "../data/constants";
import expenseService from "../services/expenseService";

export default function NovaDespesa() {

  const handleSubmit = async (formData) => {
    const payload = {
      value: Number(formData.valor),
      data: formData.data,
      category: formData.categoria,
      description: formData.descricao,
      paymentMethod: formData.metodoPagamento,
      recurrence: formData.recorrente,
    };
    await expenseService.addExpense(payload);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ 
            background: "white", 
            borderRadius: "12px", 
            padding: "30px", 
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
          }}>
            <h1 style={{ margin: "0 0 20px 0", fontSize: "24px", color: "#333" }}>
              Nova Despesa
            </h1>
            <TransactionForm
              type="despesa"
              categorias={CATEGORIAS_DESPESA}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 