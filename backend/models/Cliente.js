// Modelo de Cliente usando Mongoose
const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  // ...outros campos
});

module.exports = mongoose.model('Cliente', ClienteSchema);
