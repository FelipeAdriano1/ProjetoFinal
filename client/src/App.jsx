import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashbord from './pages/Dashbord';
import NovaReceita from './pages/NovaReceita';
import NovaDespesa from './pages/NovaDespesa';
import Metas from './pages/Metas';
import ListaMetas from './pages/ListaMetas';
import ListaDespesas from './pages/ListaDespesas';
import EditarDespesa from './pages/EditarDespesa';
import ListaReceitas from './pages/ListaReceitas';
import EditarReceita from './pages/EditarReceita';

// Componente para debug
function DebugRoute() {
  const location = useLocation();
  console.log('Rota atual:', location.pathname);
  return null;
}

function App() {
  console.log('App renderizado');
  
  return (
    <Router>
      <DebugRoute />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Páginas da aplicação */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/nova-receita" element={<NovaReceita />} />
        <Route path="/nova-despesa" element={<NovaDespesa />} />
        <Route path="/nova-meta" element={<Metas />} />
        <Route path="/metas" element={<ListaMetas />} />
        <Route path="/despesas" element={<ListaDespesas />} />
        <Route path="/despesas/:id/editar" element={<EditarDespesa />} />
        <Route path="/receitas" element={<ListaReceitas />} />
        <Route path="/receitas/:id/editar" element={<EditarReceita />} />
        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
