const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')

const registerForm = (req, res, next) => {
  res.render('pages/register')
}

const register = async (req, res, next) => {
  const { firstname, lastname, username, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    console.log('not match')
    req.flash('info', 'Password must match')
    return res.render('pages/register')
  }
  res.render('pages/register')
}

const loginForm = catchAsync(async (req, res, next) => {
  res.render('pages/login')
})

module.exports = {
  registerForm,
  loginForm,
  register
}
