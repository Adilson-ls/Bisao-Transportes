const mongoose = require('mongoose');

const freteSchema = new mongoose.Schema({
  origem: {
    type: String,
    required: true
  },
  destino: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluido'],
    default: 'pendente'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

const Frete = mongoose.model('Frete', freteSchema);

module.exports = Frete;