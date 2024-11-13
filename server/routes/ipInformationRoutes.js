const express = require('express');
const {
  fetchIpAddress,
  createIpAddress,
  allSearchedIpAddressHistory,
  deleteIpAddressHistory,
} = require('../controller/ipInfromationController');
const verify = require('../middleware/authMiddleware');
const { Roles } = require('../constant/middleware');
const router = express.Router();

/* User routes */
router.get('/ipinfo', verify([Roles.USER]), fetchIpAddress);
router.get(
  '/ipinfo/search-history',
  verify([Roles.USER]),
  allSearchedIpAddressHistory
);
router.post('/ipinfo', verify([Roles.USER]), createIpAddress);
router.delete('/ipinfo', verify([Roles.USER]), deleteIpAddressHistory);

module.exports = router;
