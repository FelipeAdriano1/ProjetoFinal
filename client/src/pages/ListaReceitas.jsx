import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import revenueService from "../services/revenueService";

export default function ListaReceitas() {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setRevenues(await revenueService.getRevenues());
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!window.confirm('Excluir receita?')) return;
    await revenueService.deleteRevenue(id);
    setRevenues(prev=>prev.filter(r=> (r._id||r.id)!==id));
  };
  const fmt = v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);

  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5'}}>
      <Navigation />
      <main style={{padding:'30px 20px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <h2>Todas as Receitas</h2>
          {loading? <p>Carregando...</p> : revenues.length===0? <p>Nenhuma receita.</p> : (
          <table style={{width:'100%',background:'white',borderRadius:'8px',borderCollapse:'collapse'}}>
            <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th style={{textAlign:'right'}}>Valor</th><th>Ações</th></tr></thead>
            <tbody>
              {revenues.map(r=> (
                <tr key={r._id||r.id} style={{borderTop:'1px solid #eee'}}>
                  <td>{r.data?.slice(0,10)}</td><td>{r.description}</td><td>{r.category}</td><td style={{textAlign:'right'}}>{fmt(r.value)}</td>
                  <td style={{display:'flex',gap:'8px'}}>
                    <Button size="sm" onClick={()=>navigate(`/receitas/${r._id||r.id}/editar`)}>Editar</Button>
                    <Button size="sm" variant="outline" onClick={()=>del(r._id||r.id)}>Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>) }
        </div>
      </main>
    </div>
  );
}
