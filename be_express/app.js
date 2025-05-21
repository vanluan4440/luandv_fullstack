require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { testConnection } = require('./src/config/database');

require('./src/scheduler/scheduler');

const app = express();

// Test database connection
testConnection();

// Import routes
const apiAggregatedDataRouter = require('./src/routes/aggregated-data.routes');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/v1/aggregated', apiAggregatedDataRouter);
// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something broke!'
  });
});

module.exports = app;
