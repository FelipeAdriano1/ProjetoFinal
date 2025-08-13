import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Navigation from "../components/Navigation";
import { TIPOS_META, TIPOS_TRANSACAO } from "../data/constants";

export default function Metas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: "",
    descricao: "",
    tipoTransacao: "",
    valorMeta: "",
    dataInicio: "",
    dataFim: "",
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
      console.log("Dados da meta:", formData);
      
      setAlert({
        type: "success",
        message: "Meta cadastrada com sucesso!"
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao cadastrar meta. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  const showDateFields = formData.tipo === "Personalizado";

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navigation />
      
      <main style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ 
            background: "white", 
            borderRadius: "12px", 
            padding: "30px", 
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
          }}>
            <div style={{ marginBottom: "30px" }}>
              <h1 style={{ margin: "0 0 10px 0", fontSize: "24px", color: "#333" }}>
                Nova Meta
              </h1>
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                Cadastre uma nova meta financeira
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {alert && (
                <Alert
                  type={alert.type}
                  message={alert.message}
                  onClose={() => setAlert(null)}
                />
              )}

              <SelectField
                label="Tipo da Meta"
                value={formData.tipo}
                onChange={(value) => handleInputChange("tipo", value)}
                options={TIPOS_META}
                placeholder="Selecione o tipo da meta"
                required
              />

              <FormField
                label="Descrição da Meta"
                type="text"
                value={formData.descricao}
                onChange={(value) => handleInputChange("descricao", value)}
                placeholder="Ex: Guardar R$ 1000 por mês"
                required
              />

              <SelectField
                label="Tipo de Transação"
                value={formData.tipoTransacao}
                onChange={(value) => handleInputChange("tipoTransacao", value)}
                options={TIPOS_TRANSACAO}
                placeholder="Selecione o tipo de transação"
                required
              />

              <FormField
                label="Valor da Meta"
                type="number"
                value={formData.valorMeta}
                onChange={(value) => handleInputChange("valorMeta", value)}
                placeholder="0,00"
                required
              />

              {showDateFields && (
                <>
                  <FormField
                    label="Data de Início"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(value) => handleInputChange("dataInicio", value)}
                    required
                  />

                  <FormField
                    label="Data de Fim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(value) => handleInputChange("dataFim", value)}
                    required
                  />
                </>
              )}

              <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{ flex: "1" }}
                >
                  {loading ? "Cadastrando..." : "Cadastrar Meta"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  style={{ flex: "1" }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 