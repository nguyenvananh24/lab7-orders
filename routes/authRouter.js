const express = require('express');
const router = express.Router();
const {
  getLoginForm,
  login,
  getRegisterForm,
  register,
  logout,
} = require('../controllers/authController');

router.get('/login', getLoginForm);
router.post('/login', login);
router.get('/register', getRegisterForm);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;
