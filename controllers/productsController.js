const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')

exports.getProductForm = (req, res, next) => {
  if (req.user.role === 'buyer') {
    return res.redirect('/products')
  }
  res.render('products/addProduct', {
    path: '/products/add',
    pageTitle: 'Add Product Page'
  })
}

exports.addProduct = catchAsync(async (req, res, next) => {
  if (req.user.role === 'buyer' || req.user.role === 'admin') {
    return res.redirect('/products')
  }
  const { title, price, description, stock, category } = req.body
  console.log(title, price, description, stock, category)
  const product = new Product({
    ...req.body,
    userID: req.user._id
  })
  console.log(req.files)
  product.images = req.files.map(file => {
    return { url: file.path, filename: file.filename }
  })
  // product.images = [
  //   {
  //     url: 'https://res.cloudinary.com/tolufolorunso/image/upload/v1631709505/StudentVend/ivyinetcncp0xhiy9pzz.png',
  //     filename: 'file name'
  //   }
  // ]
  // product.images = [
  //   'https://res.cloudinary.com/tolufolorunso/image/upload/v1631709505/StudentVend/ivyinetcncp0xhiy9pzz.png',
  //   'https://res.cloudinary.com/tolufolorunso/image/upload/v1631709505/StudentVend/ivyinetcncp0xhiy9pzz.png',
  //   'https://res.cloudinary.com/tolufolorunso/image/upload/v1631709505/StudentVend/ivyinetcncp0xhiy9pzz.png'
  // ]
  await product.save()
  req.flash('success', `Product added successfully, create another product`)
  res.status(201).redirect('/products/add')
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({})
  products.__v = undefined

  res.render('products/allProducts', {
    path: '/products',
    pageTitle: 'Products Page',
    time: req.time,
    isAuthenticated: false,
    products
  })
})

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.itemID
  const product = await Product.findById(id)
  if (!product) {
    req.flash('error', `Product not found.`)
    return res.redirect('/products')
  }
  res.render('products/singleProduct', {
    path: 'shop',
    pageTitle: product.title,
    time: req.time,
    isAuthenticated: false,
    product
  })
})

exports.getProductToEdit = async (req, res, next) => {
  if (req.user.role === 'buyer' || req.user.role === 'admin') {
    return res.redirect('/products')
  }
  const product = await Product.findById(req.params.itemID)
  res.render('products/editProduct', {
    path: '/shop',
    pageTitle: 'Products',
    time: req.time,
    isAuthenticated: false,
    product
  })
}

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.user.role === 'buyer' || req.user.role === 'admin') {
    return res.redirect('/products')
  }
  const product = await Product.findByIdAndUpdate(req.params.itemID, { ...req.body })
  req.flash('success', `'${product.title}' is updated successfully`)
  res.redirect(`/products/${product._id}`)
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
  if (req.user.role === 'buyer' || req.user.role === 'admin') {
    return res.redirect('/products')
  }
  await Product.findByIdAndRemove(req.params.itemID)
  res.redirect('/products')
})
