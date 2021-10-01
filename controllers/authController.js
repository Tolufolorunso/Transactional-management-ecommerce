const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')

const registerForm = (req, res, next) => {
  res.render('pages/register', {
    path: '/login',
    pageTitle: 'Register'
  })
}

const register = catchAsync(async (req, res, next) => {
  let { name, email, password, role, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.flash('error', `Password not matched`)
    res.redirect('/register')
  }
  role = role === 'on' ? 'seller' : 'buyer'
  try {
    const user = new User({ name, email, role })
    const registeredUser = await User.register(user, password)
    req.flash('success', `Welcome to Student Vend, ${registeredUser.name}`)
    res.redirect('/login')
  } catch (error) {
    req.flash('error', error.message)
    res.redirect('/register')
  }
})

const loginForm = catchAsync(async (req, res, next) => {
  res.render('pages/login', {
    path: '/login',
    pageTitle: 'Login'
  })
})

const login = catchAsync(async (req, res, next) => {
  req.flash('success', `Welcome back ${req.user.name.split(' ')[0]}`)
  // req.session.isLogginedIn = true
  // req.session.user = user
  return req.session.save(err => {
    const redirectUrl = req.session.returnTo || '/products'
    delete req.session.returnTo
    return res.redirect(redirectUrl)
  })
})

module.exports = {
  registerForm,
  loginForm,
  register,
  login
}
