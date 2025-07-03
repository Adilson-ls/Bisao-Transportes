// Modelo de Cliente usando Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.postgres');

const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  // ...outros campos
});

module.exports = Cliente;
