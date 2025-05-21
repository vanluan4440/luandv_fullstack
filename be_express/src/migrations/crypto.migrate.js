const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');
const { Crypto } = require('../models/crypto.model');

async function createTable() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await Crypto.sync({ force: true });
    console.log('Table cryptos has been created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to create table:', error);
    process.exit(1);
  }
}

createTable();
