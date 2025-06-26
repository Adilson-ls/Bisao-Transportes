// Modelo de Motorista usando Mongoose
const mongoose = require('mongoose');

const MotoristaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnh: { type: String, required: true },
  // ...outros campos
});

module.exports = mongoose.model('Motorista', MotoristaSchema);
