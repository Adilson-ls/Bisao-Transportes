# Bisão Transportes

## Descrição

O projeto Bisão Transportes é uma aplicação que visa facilitar a gestão de fretes, motoristas e clientes. Ele é dividido em três partes principais: backend, frontend e mobile.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

``` text
BisaoTransportes/
├── backend/          # Lógica do servidor e API
│   ├── controllers/  # Controladores para gerenciar a lógica de negócios
│   ├── models/       # Modelos de dados
│   ├── routes/       # Definição das rotas da API
│   ├── utils/        # Funções utilitárias
│   ├── config/       # Configurações do banco de dados
│   └── server.js     # Ponto de entrada do servidor
│
├── frontend/         # Aplicação web
│   ├── public/       # Arquivos públicos
│   ├── src/          # Código-fonte da aplicação
│   └── package.json  # Configurações do projeto frontend
│
├── mobile/           # Aplicação móvel
│   ├── src/          # Código-fonte da aplicação móvel
│   └── package.json  # Configurações do projeto móvel
└── README.md         # Documentação do projeto
```

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MongoDB (ou outro banco de dados)
- **Frontend**: React.js
- **Mobile**: React Native

## Instalação

### Backend

1. Navegue até a pasta `backend`.
2. Instale as dependências:

   ``` bash
   npm install
   ```

3. Configure as variáveis de ambiente, incluindo a chave da API do Google Maps.
4. Inicie o servidor:

   ``` bash
   npm start
   ```

### Frontend

1. Navegue até a pasta `frontend`.
2. Instale as dependências:

   ``` bash
   npm install
   ```

3. Inicie a aplicação:

   ``` bash
   npm start
   ```

### Mobile

1. Navegue até a pasta `mobile`.
2. Instale as dependências:

   ``` bash
   npm install
   ```

3. Inicie a aplicação:

   ``` bash
   npm start
   ```

## Uso

- Acesse a aplicação web através do navegador no endereço `http://localhost:3000`.
- Utilize o aplicativo móvel em um emulador ou dispositivo físico.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.