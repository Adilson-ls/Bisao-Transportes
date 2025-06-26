// Modelo de Frete usando Mongoose
const mongoose = require('mongoose');

const FreteSchema = new mongoose.Schema({
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  valor: { type: Number, required: true },
  // ...outros campos
});

module.exports = mongoose.model('Frete', FreteSchema);
