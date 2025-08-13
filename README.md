# GestãoFácil

Aplicação full-stack para controle financeiro pessoal, composta por três módulos independentes:

| Diretório | Descrição |
|-----------|-----------|
| `auth/`   | Serviço de autenticação (Node/Express + MongoDB) responsável por cadastro, login, refresh-token e emissão de cookies JWT + CSRF. |
| `backend/`| API de domínio (Node/Express + MongoDB) com CRUD de Despesas e Receitas. Todas as rotas são protegidas pelo JWT emitido pelo *auth*. |
| `client/` | Front-end em React + Vite que consome `auth` e `backend`. Interface simples para criar, editar, listar e excluir transações. |
---

## 1. Pré-requisitos

* Node.js 18+
* npm
* MongoDB Atlas (ou instância local)
* `mkcert` – usado para HTTPS em ambiente de desenvolvimento
---

## 2. Variáveis de ambiente

Crie um arquivo `.env` em **cada** serviço (`auth/.env`, `backend/.env`) seguindo o exemplo:

```bash
# Auth & Backend
SESSION_SECRET="chave_jwt_supersecreta"
CSRF_SECRET="chave_csrf_supersecreta"
MONGODB_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net"  # Mongo Atlas
MONGODB_DBNAME="minhas_financas"
PORT=4000  # auth usa 4000, backend usa 3001
SSL_KEY_PATH=./certs/key.pem
SSL_CERT_PATH=./certs/cert.pem
```

* O front (`client/`) não precisa de .env; as URLs estão fixas em `expenseService.js`, `revenueService.js` e `authService.js`.

---

## 3. Instalação & Execução

Abra **três** terminais diferentes na raiz do projeto.

### 3.1 Auth service
```bash
cd auth
npm install
npm run start   # HTTPS em https://localhost:4000
```

### 3.2 Backend service
```bash
cd backend
npm install
npm run start   # HTTPS em https://localhost:3001
```

### 3.3 Client (front-end)
```bash
cd client
npm install
npm run dev     # HTTPS em https://localhost:5173
```

Abra https://localhost:5173 no navegador.

---

## 4. Segurança implementada

* **HTTPS** – todos os serviços dev usam certificado self-signed gerado com `mkcert`.
* **JWT (access & refresh cookies)** – curta duração para access, longa para refresh; ambos `HttpOnly`, `Secure`, `SameSite=Strict`.
* **CSRF** – padrão *double submit* com token assinado (HMAC SHA-256) + cookie `csrf`.
* **CORS** – liberado apenas para `https://localhost:5173`.
* **Helmet + CSP** – configuração estrita bloqueia scripts externos, inline styles, iframes, etc.
* **Rate-limit** – 50 req/15 min por IP no backend.

---

## 5. Estrutura de pastas (resumida)
```
TCC/
 ├─ auth/
 ├─ backend/
 ├─ client/
 └─ README.md
```

---
