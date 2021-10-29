const express = require('express');
const passport = require('passport');
const { check, body } = require('express-validator');
const User = require('../models/userModel');

const {
  registerForm,
  loginForm,
  register,
  login
} = require('../controllers/authController');
const { validateRegister } = require('../utils/validate');
const router = express.Router();

router.route('/register').get(registerForm).post(validateRegister(), register);

router
  .route('/login')
  .get(loginForm)
  .post(
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Password or Email is incorrect.'
    }),
    login
  );
// .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login)

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out!');
  res.redirect('/login');
});

module.exports = router;
