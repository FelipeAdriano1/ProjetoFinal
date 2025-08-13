import React, { useState, useEffect } from "react";
import expenseService from "../services/expenseService";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import FinancialCard from "../components/FinancialCard";
import Button from "../components/Button";
import Navigation from "../components/Navigation";

export default function Dashboard() {
  const navigate = useNavigate();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({balance:0,income:0,expenses:0,savings:0});

  useEffect(() => {
    async function loadData() {
      try {
        const expenses = await expenseService.getExpenses();
        const mapped = expenses.map(e=>({
          id: e._id || e.id,
          type: "expense",
          description: e.description,
          category: e.category,
          amount: -Number(e.value),
          date: e.data?.slice(0,10)
        }));
        setRecentTransactions(mapped);
        const totalExpenses = expenses.reduce((sum,e)=>sum+Number(e.value||e.valor||0),0);
        setFinancialSummary(prev=>({...prev,expenses:totalExpenses,balance:-totalExpenses}));
      } catch (err) {
        console.error('Erro ao carregar despesas:', err);
      }
    }
    loadData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "20px", 
            marginBottom: "30px" 
          }}>
            <FinancialCard
              title="Saldo Total"
              value={financialSummary.balance}
              formatCurrency={formatCurrency}
              type="balance"
            />
            <FinancialCard
              title="Receitas"
              value={financialSummary.income}
              formatCurrency={formatCurrency}
              type="income"
            />
            <FinancialCard
              title="Despesas"
              value={financialSummary.expenses}
              formatCurrency={formatCurrency}
              type="expense"
            />
            <FinancialCard
              title="Economia"
              value={financialSummary.savings}
              formatCurrency={formatCurrency}
              type="savings"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
            <div>
              <div style={{ 
                background: "white", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                  <div>
                    <h2 style={{ margin: "0 0 5px 0", fontSize: "20px", color: "#333" }}>Transações Recentes</h2>
                    <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>Suas últimas movimentações financeiras</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button 
                      onClick={() => alert("Funcionalidade de filtro será implementada")} 
                      variant="outline"
                      style={{ padding: "8px", minWidth: "auto" }}
                    >
                      🔍
                    </Button>
                    <Button 
                      onClick={() => alert("Funcionalidade de busca será implementada")} 
                      variant="outline"
                      style={{ padding: "8px", minWidth: "auto" }}
                    >
                      🔎
                    </Button>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    {recentTransactions.map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => alert("Lista completa de transações será implementada")}
                      variant="outline"
                      style={{ width: "100%" }}
                    >
                      Ver Todas as Transações
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ 
                background: "white", 
                borderRadius: "12px", 
                padding: "25px", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
              }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>Meta do Mês</h3>
                <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}>Economizar R$ 2.000</p>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}>
                    <span style={{ color: "#666" }}>Progresso</span>
                    <span style={{ fontWeight: "bold" }}>R$ 1.420 / R$ 2.000</span>
                  </div>
                  <div style={{ 
                    width: "100%", 
                    height: "8px", 
                    backgroundColor: "#e9ecef", 
                    borderRadius: "4px", 
                    marginBottom: "10px" 
                  }}>
                    <div
                      style={{ 
                        width: "71%", 
                        height: "100%", 
                        backgroundColor: "#28a745", 
                        borderRadius: "4px" 
                      }}
                    ></div>
                  </div>
                  <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>71% concluído • Faltam R$ 580</p>
                </div>
              </div>

              <div style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                borderRadius: "12px", 
                padding: "25px", 
                color: "white" 
              }}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>💡 Dica do Dia</h3>
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", opacity: "0.9" }}>
                  Que tal revisar seus gastos com alimentação? Você gastou 15% a mais que o mês passado nesta categoria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
