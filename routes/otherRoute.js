const express = require('express');
const {
  registerForm,
  loginForm,
  register
} = require('../controllers/authController');
const { getAbout, getContact } = require('../controllers/otherController');
const router = express.Router();

router.get('/about', getAbout);
router.get('/contact', getContact);

module.exports = router;
