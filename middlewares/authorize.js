exports.authorizeFor = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).render('/login', {
    path: '/login',
    pageTitle: 'Login',
    pathUrl: `${req.originalUrl}`
      })
    }
    next();
  };
};