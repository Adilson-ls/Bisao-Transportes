// Modelo de Frete usando Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.postgres');

const Frete = sequelize.define('Frete', {
  origem: { type: DataTypes.STRING, allowNull: false },
  destino: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.FLOAT, allowNull: false },
  // ...outros campos
});

module.exports = Frete;
