
const API_BASE_URL = 'https://localhost:3001';

class ExpenseService {
  async getExpenses() {
    const response = await fetch(`${API_BASE_URL}/api/expenses`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao buscar despesas');
    return data.expenses || [];
  }

  async getExpenseById(id) {
    const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao buscar despesa');
    return data;
  }

  async addExpense(expenseData) {
    const response = await fetch(`${API_BASE_URL}/api/expenses/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(expenseData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao adicionar despesa');
    return data;
  }

  async updateExpense(id, expenseData) {
    const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(expenseData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar despesa');
    return data;
  }

  async deleteExpense(id) {
    const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao excluir despesa');
    return data;
  }
}

export default new ExpenseService();
