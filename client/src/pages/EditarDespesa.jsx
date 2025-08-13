import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import TransactionForm from "../components/TransactionForm";
import { CATEGORIAS_DESPESA } from "../data/constants";
import expenseService from "../services/expenseService";

export default function EditarDespesa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { expense } = await expenseService.getExpenseById(id);
        if (!expense) throw new Error("Despesa não encontrada");
        setInitialData({
          valor: expense.value,
          data: expense.data?.slice(0,10),
          categoria: expense.category,
          descricao: expense.description,
          metodoPagamento: expense.paymentMethod,
          recorrente: expense.recurrence,
        });
      } catch (err) {
        alert(err.message || "Erro ao carregar despesa");
        navigate("/despesas");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    const payload = {
      value: Number(formData.valor),
      data: formData.data,
      category: formData.categoria,
      description: formData.descricao,
      paymentMethod: formData.metodoPagamento,
      recurrence: formData.recorrente,
    };
    await expenseService.updateExpense(id, payload);
  };

  if (loading) return <p>Carregando...</p>;
  if (!initialData) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h1 style={{ margin: 0, marginBottom: 20 }}>Editar Despesa</h1>
            <TransactionForm
              type="despesa"
              categorias={CATEGORIAS_DESPESA}
              onSubmit={handleSubmit}
              initialData={initialData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
