const express = require('express');
const {
  fetchIpAddress,
  createIpAddress,
  allSearchedIpAddressHistory,
  deleteIpAddressHistory,
} = require('../controller/ipInfromationController');
const router = express.Router();

/* User routes */
router.get('/ipinfo', fetchIpAddress);
router.get('/ipinfo/search-history', allSearchedIpAddressHistory);
router.post('/ipinfo', createIpAddress);
router.delete('/ipinfo', deleteIpAddressHistory);

module.exports = router;
