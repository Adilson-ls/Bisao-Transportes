// Modelo de Motorista usando Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.postgres');

const Motorista = sequelize.define('Motorista', {
  nome: { type: DataTypes.STRING, allowNull: false },
  cnh: { type: DataTypes.STRING, allowNull: false },
  // ...outros campos
});

module.exports = Motorista;
