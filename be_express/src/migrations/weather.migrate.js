const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Weather } = require('../models/weather.model');


async function createTable() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await Weather.sync({ force: true });
    console.log('Table weathers has been created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to create table:', error);
    process.exit(1);
  }
}

createTable();
