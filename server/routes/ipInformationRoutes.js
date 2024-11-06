const express = require('express');
const {
  fetchIpAddress,
  createIpAddress,
  allSearchedIpAddressHistory,
} = require('../controller/ipInfromationController');
const router = express.Router();

/* User routes */
router.get('/ipinfo', fetchIpAddress);
router.post('/ipinfo', createIpAddress);
router.get('/ipinfo/search-history', allSearchedIpAddressHistory);

module.exports = router;
