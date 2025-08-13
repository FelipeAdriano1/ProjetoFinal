import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>GestãoFácil</h1>
            <nav>
              <Link to="/home" style={{ marginRight: "15px", textDecoration: "none", color: "#333" }}>Início</Link>
              <Link to="/login" style={{ marginRight: "15px", textDecoration: "none", color: "#333" }}>Entrar</Link>
              <Link to="/cadastro" style={{ textDecoration: "none", color: "#333" }}>Cadastrar</Link>
            </nav>
          </div>
        </div>
      </header>

      <section style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "white", 
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Controle suas finanças de forma simples e eficiente
          </h1>
          <p style={{ fontSize: "20px", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
            Organize suas receitas, despesas e metas financeiras em uma plataforma 
            intuitiva e segura. Tome decisões mais inteligentes sobre seu dinheiro.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link to="/cadastro" style={{
              background: "white",
              color: "#667eea",
              padding: "15px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              Começar Agora
            </Link>
            <Link to="/login" style={{
              background: "transparent",
              color: "white",
              padding: "15px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              border: "2px solid white",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "60px" }}>
            Por que escolher o GestãoFácil?
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "40px" 
          }}>
            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "#667eea", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                fontSize: "32px",
                color: "white"
              }}>
                📊
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Controle Total</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Acompanhe todas suas receitas e despesas em tempo real, 
                com gráficos e relatórios detalhados.
              </p>
            </div>
            
            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "#667eea", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                fontSize: "32px",
                color: "white"
              }}>
                🔒
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Segurança Garantida</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Seus dados financeiros estão protegidos com criptografia 
                de ponta a ponta.
              </p>
            </div>
            
            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "#667eea", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                fontSize: "32px",
                color: "white"
              }}>
                📱
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Acesso em Qualquer Lugar</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Use nossa plataforma no computador, tablet ou celular. 
                Suas informações sempre sincronizadas.
              </p>
            </div>
            
            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "#667eea", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 20px",
                fontSize: "32px",
                color: "white"
              }}>
                👥
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Suporte Especializado</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Nossa equipe está sempre pronta para ajudar você 
                a alcançar seus objetivos financeiros.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ 
        background: "#f8f9fa", 
        padding: "80px 20px", 
        textAlign: "center" 
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
            Pronto para começar?
          </h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
            Junte-se a milhares de usuários que já transformaram 
            sua relação com o dinheiro.
          </p>
          <Link to="/cadastro" style={{
            background: "#667eea",
            color: "white",
            padding: "15px 40px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
            display: "inline-block"
          }}>
            Criar Conta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
} 