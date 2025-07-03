# Explicação da Estrutura e Funcionamento do Projeto Bisão Transportes

## 1. Visão Geral

O projeto é dividido em três partes principais: backend (servidor/API), frontend (aplicação web) e mobile (aplicação para celular). Aqui vamos focar no backend e mostrar como tudo se conecta e como rodar o sistema.

---

## 2. Como os Arquivos se Ligam

### server.js

- É o "chefe" do backend. Ele inicia o servidor Express, conecta ao banco de dados e importa as rotas principais:
  - `/clientes` → `routes/clienteRoutes.js`
  - `/motoristas` → `routes/motoristaRoutes.js`
  - `/fretes` → `routes/freteRoutes.js`

### routes/

- Cada arquivo de rota recebe as requisições e chama o controller correspondente.
- Exemplo: `clienteRoutes.js` chama funções do `controllers/clienteController.js`.

### controllers/

- Os controllers recebem os dados das rotas, processam a lógica e usam os models para acessar o banco de dados.
- Exemplo: `criarCliente` pega os dados do cliente e salva usando o model `Cliente`.

### models/

- Os models definem como os dados são salvos no banco (MongoDB, usando Mongoose).
- Exemplo: `models/Cliente.js` define o formato de um cliente.

### utils/

- Funções auxiliares, como formatar CPF ou datas.

### config/

- Configurações, como a conexão com o banco de dados (`config/db.js`).

---

## 3. Fluxo de uma Requisição (Exemplo: Cadastrar Cliente)

1. O usuário faz um pedido para `/clientes` (POST).
2. O `server.js` direciona para `routes/clienteRoutes.js`.
3. A rota chama `controllers/clienteController.js` (função `criarCliente`).
4. O controller usa o model `Cliente` para salvar no banco.
5. Se precisar, usa funções de `utils/` para formatar dados.
6. O resultado volta para o usuário.

---

## 4. Como Rodar o Backend

1. Instale as dependências:

   ``` bash
   cd backend
   npm install
   ```

2. Configure o banco de dados em um arquivo `.env` (opcional, padrão: MongoDB local).

3. Inicie o servidor:

   ``` bash
   npm start
   ```

4. O backend estará rodando em `http://localhost:3001`.

---

## 5. Como Rodar o Frontend

1. Instale as dependências:

   ``` bash
   cd frontend
   npm install
   ```

2. Inicie a aplicação:

   ``` bash
   npm start
   ```

3. Acesse pelo navegador em `http://localhost:3000`.

---

## 6. Como Rodar o Mobile

1. Instale as dependências:

   ``` bash
   cd mobile
   npm install
   ```

2. Inicie a aplicação:

   ``` bash
   npm start
   ```

3. Use um emulador ou dispositivo físico para testar.

---

## 7. Resumo Visual da Estrutura

``` text
backend/
  controllers/  <--- lógica de negócio
  models/       <--- modelos de dados
  routes/       <--- rotas da API
  utils/        <--- funções auxiliares
  config/       <--- configuração do banco
  server.js     <--- inicia tudo
frontend/
  ...           <--- aplicação web
mobile/
  ...           <--- aplicação mobile
```

---

Pronto! Agora você sabe como tudo se conecta e como rodar o projeto Bisão Transportes.
