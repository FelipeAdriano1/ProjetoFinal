import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import Button from "./Button";
import Alert from "./Alert";

export default function TransactionForm({ 
  type,
  categorias,
  onSubmit,
  onCancel,
  initialData = null
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    valor: "",
    data: "",
    categoria: "",
    descricao: "",
    metodoPagamento: "",
    recorrente: false,
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const metodosPagamento = [
    "Dinheiro",
    "PIX", 
    "Cartão de Débito",
    "Cartão de Crédito",
    "Transferência Bancária",
    "Cheque",
    "Outros",
  ];

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
      await onSubmit(formData);
      
      setAlert({
        type: "success",
        message: `${type === "receita" ? "Receita" : "Despesa"} cadastrada com sucesso!`
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error", 
        message: error.message || `Erro ao cadastrar ${type}. Tente novamente.`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/dashboard");
    }
  };

  const title = type === "receita" ? "Nova Receita" : "Nova Despesa";
  const subtitle = `Cadastre uma nova ${type}`;
  const dataField = type === "receita" ? "Data da Receita" : "Data da Despesa";
  const recorrenteLabel = `${type === "receita" ? "Receita" : "Despesa"} Recorrente`;
  const submitText = `Cadastrar ${type === "receita" ? "Receita" : "Despesa"}`;

  return (
    <div>
      <div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
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
            label="Valor"
            type="number"
            value={formData.valor}
            onChange={(value) => handleInputChange("valor", value)}
            placeholder="0,00"
            required
          />

          <FormField
            label={dataField}
            type="date"
            value={formData.data}
            onChange={(value) => handleInputChange("data", value)}
            required
          />

          <SelectField
            label="Categoria"
            value={formData.categoria}
            onChange={(value) => handleInputChange("categoria", value)}
            options={categorias}
            placeholder="Selecione uma categoria"
            required
          />

          <FormField
            label="Descrição"
            type="text"
            value={formData.descricao}
            onChange={(value) => handleInputChange("descricao", value)}
            placeholder={`Descreva a ${type}`}
            required
          />

          <SelectField
            label="Método de Pagamento"
            value={formData.metodoPagamento}
            onChange={(value) => handleInputChange("metodoPagamento", value)}
            options={metodosPagamento}
            placeholder="Selecione o método"
            required
          />

          <CheckboxField
            label={recorrenteLabel}
            checked={formData.recorrente}
            onChange={(value) => handleInputChange("recorrente", value)}
          />

          <div>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : submitText}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 