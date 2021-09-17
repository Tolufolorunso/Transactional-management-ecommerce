exports.getAbout = (req, res) => {
  res.render('pages/about', {
    path: '/about',
    pathName: 'About Us'
  })
}

exports.getContact = (req, res) => {
  res.render('pages/contact', {
    path: '/contact',
    pathName: 'Contact Us'
  })
}
