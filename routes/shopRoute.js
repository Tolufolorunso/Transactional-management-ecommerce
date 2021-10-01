const express = require('express')

const {
  addToCart,
  getCart,
  clearCart,
  deleteCartItem,
  updateProductQuantity
} = require('../controllers/shopController')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get('/cart', isLoggedIn, getCart)
router.post('/cart', isLoggedIn, addToCart)
router.delete('/cart/:id', isLoggedIn, deleteCartItem)
router.delete('/clear-cart', isLoggedIn, clearCart)
router.patch('/update-cart', isLoggedIn, updateProductQuantity)

module.exports = router
