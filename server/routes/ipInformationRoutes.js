const express = require('express');
const { fetchIpAddress } = require('../controller/ipInfromationController');
const router = express.Router();

/* User routes */
router.get('/ipinfo', fetchIpAddress);

module.exports = router;