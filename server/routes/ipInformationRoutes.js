const express = require('express');
const {
  fetchIpAddress,
  createIpAddress,
} = require('../controller/ipInfromationController');
const router = express.Router();

/* User routes */
router.get('/ipinfo', fetchIpAddress);
router.post('/ipinfo', createIpAddress);

module.exports = router;
