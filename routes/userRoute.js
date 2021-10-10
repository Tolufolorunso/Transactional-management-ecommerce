const express = require('express')
const { adminDashboard, adminAddProduct, order } = require('../controllers/adminController')
const { getSellerDashboard, addProduct, ProductsSold } = require('../controllers/userController')

const router = express.Router()

// Seller
router.get('/seller', getSellerDashboard)
router.get('/seller/products/add', addProduct)
router.get('/seller/products/sold', ProductsSold)

// admin
router.get('/admin', adminDashboard)
router.get('/admin/products/add', adminAddProduct)
router.get('/admin/products/sold', order)

module.exports = router
