import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import Alert from "../components/Alert";
import authService from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await authService.login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao fazer login. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ 
        background: "white", 
        padding: "40px", 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
        width: "100%", 
        maxWidth: "400px" 
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#333" }}>Entrar</h1>
          <p style={{ color: "#666", margin: "0" }}>Faça login para acessar sua conta</p>
        </div>

        <form onSubmit={handleSubmit}>
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            placeholder="seu@email.com"
            required
          />

          <PasswordField
            label="Senha"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            placeholder="Digite sua senha"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "20px" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
          <p style={{ margin: "0", color: "#666" }}>
            Não tem uma conta?{" "}
            <Link to="/cadastro" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
