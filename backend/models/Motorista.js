const mongoose = require('mongoose');

const motoristaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cnh: {
    type: String,
    required: true,
  },
  veiculo: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Motorista', motoristaSchema);