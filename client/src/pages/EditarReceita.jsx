import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import TransactionForm from "../components/TransactionForm";
import { CATEGORIAS_RECEITA } from "../data/constants";
import revenueService from "../services/revenueService";

export default function EditarReceita(){
  const {id}=useParams();
  const nav=useNavigate();
  const [data,setData]=useState(null);
  const [load,setLoad]=useState(true);
  useEffect(()=>{(async()=>{
    try{
      const { revenue } = await revenueService.getRevenueById(id);
      if(!revenue) throw new Error('Receita não encontrada');
      setData({
        valor: revenue.value,
        data: revenue.data?.slice(0,10),
        categoria: revenue.category,
        descricao: revenue.description,
        metodoPagamento: revenue.paymentMethod,
        recorrente: revenue.recurrence,
      });
    }catch(e){alert(e.message);nav('/receitas');}
    finally{setLoad(false);} })();},[id,nav]);

  const submit = async (formData)=>{
    const payload={
      value:Number(formData.valor),
      data:formData.data,
      category:formData.categoria,
      description:formData.descricao,
      paymentMethod:formData.metodoPagamento,
      recurrence:formData.recorrente,
    };
    await revenueService.updateRevenue(id,payload);
  };
  if(load) return <p>Carregando...</p>;
  if(!data) return null;
  return (<div style={{minHeight:'100vh',background:'#f5f5f5'}}>
    <Navigation />
    <main style={{padding:'30px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <div style={{background:'white',borderRadius:'12px',padding:'30px',boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}}>
          <h1 style={{margin:0,marginBottom:20}}>Editar Receita</h1>
          <TransactionForm type="receita" categorias={CATEGORIAS_RECEITA} initialData={data} onSubmit={submit}/>
        </div>
      </div>
    </main>
  </div>);
}
