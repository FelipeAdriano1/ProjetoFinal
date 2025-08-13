import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import expenseService from "../services/expenseService";

export default function ListaDespesas() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadExpenses = async () => {
    try {
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Erro ao carregar despesas:", err);
      alert("Erro ao carregar despesas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta despesa?")) return;
    try {
      await expenseService.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => (e._id || e.id) !== id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert(err.message || "Erro ao excluir despesa");
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "20px" }}>Todas as Despesas</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : expenses.length === 0 ? (
            <p>Nenhuma despesa encontrada.</p>
          ) : (
            <table style={{ width: "100%", background: "white", borderRadius: "8px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Data</th>
                  <th style={{ padding: "12px" }}>Descrição</th>
                  <th style={{ padding: "12px" }}>Categoria</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Valor</th>
                  <th style={{ padding: "12px" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp._id || exp.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{exp.data?.slice(0, 10)}</td>
                    <td style={{ padding: "12px" }}>{exp.description}</td>
                    <td style={{ padding: "12px" }}>{exp.category}</td>
                    <td style={{ padding: "12px", textAlign: "right" }}>{formatCurrency(exp.value)}</td>
                    <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                      <Button size="sm" onClick={() => navigate(`/despesas/${exp._id || exp.id}/editar`)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(exp._id || exp.id)}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
