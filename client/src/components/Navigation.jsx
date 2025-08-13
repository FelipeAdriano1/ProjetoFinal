import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import authService from "../services/authService";

export default function Navigation() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const dropdownItemStyle = {
    display: "block",
    padding: "8px 12px",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px"
  };
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Erro no logout:", error);
      alert("Erro ao fazer logout. Tente novamente.");
    }
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Nova Receita":
        navigate("/nova-receita");
        break;
      case "Nova Despesa":
        navigate("/nova-despesa");
        break;
      case "Metas":
        navigate("/metas");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        console.log(`Ação: ${action}`);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={{ background: "white", borderBottom: "1px solid #e0e0e0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "70px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <h1 
              onClick={() => navigate("/dashboard")}
              style={{ 
                margin: "0", 
                fontSize: "24px", 
                color: "#333", 
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Minhas Finanças
            </h1>
            <nav style={{ display: "flex", gap: "20px" }}>
              <button
                onClick={() => handleButtonClick("Dashboard")}
                style={{
                  textDecoration: "none",
                  color: isActive("/dashboard") ? "#667eea" : "#666",
                  fontWeight: isActive("/dashboard") ? "bold" : "normal",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  transition: "all 0.2s"
                }}
              >
                Dashboard
              </button>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => toggleMenu("receitas")}
                  style={{
                    textDecoration: "none",
                    color: openMenu === "receitas" ? "#667eea" : "#666",
                    fontWeight: openMenu === "receitas" ? "bold" : "normal",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  Receitas ▾
                </button>
                {openMenu === "receitas" && (
                  <div style={{
                    position: "absolute",
                    top: "36px",
                    left: 0,
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                    zIndex: 10,
                  }}>
                    <button onClick={() => handleButtonClick("Nova Receita")} style={dropdownItemStyle}>Nova Receita</button>
                    <button onClick={() => navigate("/receitas") } style={dropdownItemStyle}>Listar Receitas</button>
                  </div>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => toggleMenu("despesas")}
                  style={{
                    textDecoration: "none",
                    color: openMenu === "despesas" ? "#667eea" : "#666",
                    fontWeight: openMenu === "despesas" ? "bold" : "normal",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  Despesas ▾
                </button>
                {openMenu === "despesas" && (
                  <div style={{
                    position: "absolute",
                    top: "36px",
                    left: 0,
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                    zIndex: 10,
                  }}>
                    <button onClick={() => handleButtonClick("Nova Despesa")} style={dropdownItemStyle}>Nova Despesa</button>
                    <button onClick={() => navigate("/despesas") } style={dropdownItemStyle}>Listar Despesas</button>
                  </div>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => toggleMenu("metas")}
                  style={{
                    textDecoration: "none",
                    color: openMenu === "metas" ? "#667eea" : "#666",
                    fontWeight: openMenu === "metas" ? "bold" : "normal",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  Metas ▾
                </button>
                {openMenu === "metas" && (
                  <div style={{
                    position: "absolute",
                    top: "36px",
                    left: 0,
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "6px",
                    zIndex: 10,
                  }}>
                    <button onClick={() => handleButtonClick("Metas")} style={dropdownItemStyle}>Visão Geral</button>
                    <button onClick={() => navigate("/metas/novo") } style={dropdownItemStyle}>Nova Meta</button>
                  </div>
                )}
              </div>

            </nav>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Button 
              onClick={() => handleButtonClick("Notificações")} 
              variant="outline"
              style={{ padding: "8px", minWidth: "auto" }}
            >
              🔔
            </Button>
            <Button 
              onClick={() => handleButtonClick("Configurações")} 
              variant="outline"
              style={{ padding: "8px", minWidth: "auto" }}
            >
              ⚙️
            </Button>
            <div onClick={() => handleButtonClick("Perfil")} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              background: "#f8f9fa"
            }}>
              👤
              <span style={{ color: "#333", fontWeight: "500" }}>João Silva</span>
            </div>
            <Button 
              onClick={() => handleButtonClick("Logout")} 
              variant="outline"
              style={{ padding: "8px 12px", minWidth: "auto", fontSize: "12px" }}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 