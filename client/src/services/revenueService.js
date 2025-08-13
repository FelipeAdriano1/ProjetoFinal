const API_BASE_URL = 'https://localhost:3001';

class RevenueService {
  async addRevenue(data) {
    const res = await fetch(`${API_BASE_URL}/api/revenues/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro ao adicionar receita');
    return json;
  }

  async getRevenues() {
    const res = await fetch(`${API_BASE_URL}/api/revenues`, {
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro ao buscar receitas');
    return json.revenues || [];
  }

  async getRevenueById(id) {
    const res = await fetch(`${API_BASE_URL}/api/revenues/${id}`, {
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro ao buscar receita');
    return json;
  }

  async updateRevenue(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/revenues/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro ao atualizar receita');
    return json;
  }

  async deleteRevenue(id) {
    const res = await fetch(`${API_BASE_URL}/api/revenues/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro ao excluir receita');
    return json;
  }
}

export default new RevenueService();
