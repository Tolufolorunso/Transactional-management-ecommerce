exports.getAbout = (req, res) => {
  res.render('pages/about', {
    path: '/about',
    pageTitle: 'About Us'
  })
}

exports.getContact = (req, res) => {
  res.render('pages/contact', {
    path: '/contact',
    pageTitle: 'Contact Us'
  })
}
