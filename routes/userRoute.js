const express = require('express')
const { getSellerDashboard, addProduct, ProductsSold } = require('../controllers/userController')

const router = express.Router()

router.get('/seller', getSellerDashboard)
router.get('/seller/products/add', addProduct)
router.get('/seller/products/sold', ProductsSold)

module.exports = router
