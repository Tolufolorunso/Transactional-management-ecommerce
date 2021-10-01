const { login } = require('../controllers/authController')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be signed in')
    return res.redirect('/login')
  }
  next()
}

// exports.checkLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl
//     console.log(req.session.returnTo)
//     req.flash('error', 'You must be signed in')
//     return res.redirect('/')
//   }
//   next()
// }
