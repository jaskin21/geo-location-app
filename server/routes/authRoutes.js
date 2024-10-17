const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../authentication/userAuthentication');
const router = express.Router();

/* User routes */
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;