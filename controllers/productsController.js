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
  if (req.user.role === 'buyer') {
    return res.redirect('/products')
  }

  if (req.body.available === 'true') {
    req.body.available = true
  } else {
    req.body.available = false
  }
  req.body.title = req.body.title

  const product = new Product({
    ...req.body,
    // productCode: `${req.body.title[0]}${faker.helpers.replaceSymbolWithNumber('####-##########')}`,
    productCode: Math.random(),
    userID: req.user._id
  })

  product.images = req.files.map(file => {
    return { url: file.path, filename: file.filename }
  })


  await product.save()
  req.flash('success', `Product added successfully, create another product`)
  res.status(201).redirect('/products/add')
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({})
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
  if (req.user.role === 'buyer') {
    return res.redirect('/products')
  }
  const product = await Product.findById(req.params.itemID)
  if (!product) {
    req.flash('info', `Product with ID '${req.params.itemID}' not found`)
    return res.redirect('/users/seller')
  }
  res.render('seller/edit-product', {
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
  if (req.user.role === 'buyer') {
    return res.redirect('/products')
  }

  // const product = await Product.findByIdAndRemove(req.params.itemID)
  const product = await Product.findOneAndRemove({ userID: req.user._id, _id: req.params.itemID })
  if (!product) {
    req.flash('info', `Product with ID '${req.params.itemID}' not found`)
    return res.redirect('/users/seller')
  }

  req.flash('success', `'${product.title}' is deleted successfully`)
  // res.render('seller/seller-products', {
  //   path: '/users/seller',
  //   pageTitle: 'Seller Dashboard'
  // })
  res.redirect('/users/seller')
})
