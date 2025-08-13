import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import Alert from "../components/Alert";
import authService from "../services/authService";

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        type: "error",
        message: "As senhas não coincidem."
      });
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData.name, formData.email, formData.password);
      setAlert({
        type: "success",
        message: "Conta criada com sucesso! Redirecionando para o login..."
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao criar conta. Tente novamente."
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
          <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#333" }}>Criar Conta</h1>
          <p style={{ color: "#666", margin: "0" }}>Preencha os dados para criar sua conta</p>
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
            label="Nome Completo"
            type="text"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            placeholder="Seu nome completo"
            required
          />

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
            showStrength={true}
          />

          <PasswordField
            label="Confirmar Senha"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            placeholder="Confirme sua senha"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "20px" }}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
          <p style={{ margin: "0", color: "#666" }}>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
