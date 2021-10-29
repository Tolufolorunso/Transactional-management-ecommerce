const { validationResult } = require('express-validator');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

const registerForm = (req, res, next) => {
  if (req.user) {
    return res.redirect('/products');
  }
  res.render('user/register', {
    path: '/register',
    pageTitle: 'Register',
    errors: [],
    pathUrl: `${req.originalUrl}`,
    oldInput: { name: '', email: '', password: '', confirmPassword: '' }
  });
};

const register = catchAsync(async (req, res, next) => {
  let { name, email, password, role, confirmPassword } = req.body;

  const errors = validationResult(req).array();
  console.log(errors);
  if (errors.length) {
    return res.status(422).render('user/register', {
      path: '/register',
      pageTitle: 'Register',
      errors: errors,
      oldInput: { name, email, password, confirmPassword },
      pathUrl: `${req.originalUrl}`
    });
  }

  role = role === 'on' ? 'seller' : 'buyer';
  try {
    const user = new User({ name, email, role });
    const registeredUser = await User.register(user, password);
    req.flash('success', `Welcome to Student Vend, ${registeredUser.name}`);
    res.status(201).redirect('/login');
  } catch (error) {
    req.flash('error', error.message);
    res.status(500).redirect('/register');
  }
});

const loginForm = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.redirect('/products');
  }
  res.render('user/login', {
    path: '/login',
    pageTitle: 'Login',
    pathUrl: `${req.originalUrl}`
  });
});

const login = catchAsync(async (req, res, next) => {
  req.flash('success', `Welcome back ${req.user.name.split(' ')[0]}`);
  // req.session.isLogginedIn = true
  // req.session.user = user
  const sendTo = req.user.role === 'seller' ? '/users/seller' : '/products';
  return req.session.save(err => {
    const redirectUrl = req.session.returnTo || sendTo;
    delete req.session.returnTo;
    return res.redirect(redirectUrl);
  });
});

module.exports = {
  registerForm,
  loginForm,
  register,
  login
};
