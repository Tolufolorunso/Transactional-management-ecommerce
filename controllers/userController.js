const catchAsync = require('../utils/catchAsync')
const Product = require('../models/productModel')

const getSellerDashboard = catchAsync(async (req, res, next) => {
  let sellerProducts
  sellerProducts = await Product.find({ userID: req.user._id })
  if (!sellerProducts) sellerProducts = []

  console.log(sellerProducts)
  res.render('seller/seller-products', {
    path: '/users/seller',
    pageTitle: 'Seller Dashboard',
    products: sellerProducts
  })
})

const addProduct = catchAsync(async (req, res, next) => {
  res.render('seller/addProduct', {
    path: '/users/seller/products/add',
    pageTitle: 'Add Product'
  })
})

const ProductsSold = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  })
})

module.exports = { getSellerDashboard, addProduct, ProductsSold }
