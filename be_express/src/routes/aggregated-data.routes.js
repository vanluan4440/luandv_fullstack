const express = require('express');
const router = express.Router();
const aggregatedDataController = require('../controllers/aggregated-data.controller');
router.get('/data', aggregatedDataController.getAggregatedData);

module.exports = router; 