// Ponto de entrada do servidor
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Rotas de exemplo
app.get('/', (req, res) => {
  res.send('API Bisão Transportes rodando!');
});

// Importando e usando as rotas de clientes, motoristas e fretes
const clienteRoutes = require('./routes/clienteRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const freteRoutes = require('./routes/freteRoutes');

app.use('/clientes', clienteRoutes);
app.use('/motoristas', motoristaRoutes);
app.use('/fretes', freteRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
