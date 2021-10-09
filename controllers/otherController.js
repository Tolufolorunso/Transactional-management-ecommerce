exports.getAbout = (req, res) => {
  res.render('pages/about', {
    path: '/about',
    pageTitle: 'About Us',
    pathUrl: `${req.originalUrl}`
  })
}

exports.getContact = (req, res) => {
  res.render('pages/contact', {
    path: '/contact',
    pageTitle: 'Contact Us',
    pathUrl: `${req.originalUrl}`
  })
}
