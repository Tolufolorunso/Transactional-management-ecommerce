const express = require('express')
const { registerForm, loginForm, register } = require('../controllers/authController')
const router = express.Router()

router.route('/register').get(registerForm).post(register)
router.route('/login').get(loginForm)

module.exports = router
