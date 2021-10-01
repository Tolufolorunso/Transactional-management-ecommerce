const express = require('express')
const passport = require('passport')
const { registerForm, loginForm, register, login } = require('../controllers/authController')
const router = express.Router()

router.route('/register').get(registerForm).post(register)

router
  .route('/login')
  .get(loginForm)
  .post(
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Password or Email is incorrect.'
    }),
    login
  )
// .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login)

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'You have been logged out!')
  res.redirect('/products')
})

module.exports = router
