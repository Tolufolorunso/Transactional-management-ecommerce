const catchAsync = require('../utils/catchAsync')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const Order = require('../models/orderModel')


const adminDashboard = catchAsync(async (req, res, next) => {
  let products
  products = await Product.find({ userID: req.user._id })
  if (!products) products = []

  res.render('admin/dashboard', {
    path: '/users/admin',
    pageTitle: 'Admin Dashboard',
    products: products
  })
})

const adminAddProduct = catchAsync(async (req, res, next) => {
  res.render('seller/addProduct', {
    path: '/users/seller/products/add',
    pageTitle: 'Add Product'
  })
})

const order = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  })
})

module.exports = { adminDashboard, adminAddProduct, order }
