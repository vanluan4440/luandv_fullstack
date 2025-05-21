const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Crypto = sequelize.define('Crypto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false
  },
  market_cap: {
    type: DataTypes.DECIMAL(30, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'cryptos'
});

module.exports = { Crypto };
