import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Navigation from "../components/Navigation";

export default function ListaMetas() {
  const navigate = useNavigate();
  
  const [metas] = useState([
    {
      id: 1,
      tipo: "Mensal",
      descricao: "Guardar R$ 1000 por mês",
      valorMeta: 1000,
      valorAtual: 600,
      tipoTransacao: "Saldo",
      status: "Em andamento",
      periodo: "Janeiro 2024"
    },
    {
      id: 2,
      tipo: "Trimestral", 
      descricao: "Ganhar R$ 15.000 com freelances",
      valorMeta: 15000,
      valorAtual: 12000,
      tipoTransacao: "Receita",
      status: "Em andamento",
      periodo: "Q1 2024"
    },
    {
      id: 3,
      tipo: "Anual",
      descricao: "Ter saldo de R$ 50.000 no final do ano",
      valorMeta: 50000,
      valorAtual: 35000,
      tipoTransacao: "Saldo", 
      status: "Em andamento",
      periodo: "2024"
    }
  ]);

  const calcularProgresso = (atual, meta) => {
    return Math.round((atual / meta) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Concluída": return "#28a745";
      case "Em andamento": return "#007bff";
      case "Atrasada": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const handleNovaMeta = () => {
    navigate("/metas");
  };

  const handleEditarMeta = (id) => {
    console.log("Editar meta:", id);
  };

  const handleExcluirMeta = (id) => {
    console.log("Excluir meta:", id);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ 
            background: "white", 
            borderRadius: "12px", 
            padding: "30px", 
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <div>
                <h1 style={{ margin: "0 0 10px 0", fontSize: "24px", color: "#333" }}>
                  Minhas Metas
                </h1>
                <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                  Gerencie suas metas financeiras
                </p>
              </div>
              
              <Button onClick={handleNovaMeta}>
                + Nova Meta
              </Button>
            </div>

            {metas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "#666", marginBottom: "20px" }}>
                  Nenhuma meta cadastrada ainda.
                </p>
                <Button onClick={handleNovaMeta}>
                  Criar Primeira Meta
                </Button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {metas.map((meta) => {
                  const progresso = calcularProgresso(meta.valorAtual, meta.valorMeta);
                  
                  return (
                    <div 
                      key={meta.id} 
                      style={{ 
                        border: "1px solid #e0e0e0", 
                        borderRadius: "8px", 
                        padding: "20px",
                        background: "white"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                        <div>
                          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>
                            {meta.descricao}
                          </h3>
                          <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>
                            Tipo: {meta.tipo} • {meta.tipoTransacao}
                          </p>
                          <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                            Período: {meta.periodo}
                          </p>
                        </div>
                        
                        <span style={{ 
                          color: getStatusColor(meta.status),
                          fontWeight: "bold",
                          fontSize: "12px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          background: `${getStatusColor(meta.status)}20`
                        }}>
                          {meta.status}
                        </span>
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                          <span style={{ color: "#666" }}>
                            R$ {meta.valorAtual.toLocaleString()}
                          </span>
                          <span style={{ color: "#666" }}>
                            de R$ {meta.valorMeta.toLocaleString()}
                          </span>
                        </div>
                        <div style={{ 
                          width: "100%", 
                          height: "8px", 
                          backgroundColor: "#e9ecef", 
                          borderRadius: "4px",
                          overflow: "hidden"
                        }}>
                          <div 
                            style={{ 
                              width: `${progresso}%`, 
                              height: "100%", 
                              backgroundColor: "#28a745", 
                              borderRadius: "4px",
                              transition: "width 0.3s ease"
                            }}
                          ></div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "5px" }}>
                          <span style={{ color: "#666" }}>Progresso</span>
                          <span style={{ fontWeight: "bold" }}>{progresso}%</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="outline"
                          onClick={() => handleEditarMeta(meta.id)}
                          style={{ fontSize: "12px", padding: "8px 12px" }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleExcluirMeta(meta.id)}
                          style={{ fontSize: "12px", padding: "8px 12px" }}
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 