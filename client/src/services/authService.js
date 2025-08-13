const API_BASE_URL = 'https://localhost:4000';

class AuthService {
    async getCSRFToken() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/csrf`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Erro ao obter token CSRF');
            }
            
            const data = await response.json();
            return data.csrfToken;
        } catch (error) {
            console.error('Erro ao obter CSRF token:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const csrfToken = await this.getCSRFToken();
            
            const response = await fetch(`${API_BASE_URL}/api/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro no login');
            }

            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    async signup(email, password) {
        try {
            const csrfToken = await this.getCSRFToken();
            
            const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro no cadastro');
            }

            return data;
        } catch (error) {
            console.error('Erro no cadastro:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const csrfToken = await this.getCSRFToken();
            
            const response = await fetch(`${API_BASE_URL}/api/users/signout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro no logout');
            }

            return data;
        } catch (error) {
            console.error('Erro no logout:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/currentuser`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao obter usuário');
            }

            return data.currentUser;
        } catch (error) {
            console.error('Erro ao obter usuário atual:', error);
            throw error;
        }
    }

    async refreshTokens() {
        try {
            const csrfToken = await this.getCSRFToken();
            
            const response = await fetch(`${API_BASE_URL}/api/users/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao renovar tokens');
            }

            return data;
        } catch (error) {
            console.error('Erro ao renovar tokens:', error);
            throw error;
        }
    }
}

export default new AuthService(); 