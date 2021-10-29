const express = require('express')

const {
  addToCart,
  getCart,
  clearCart,
  deleteCartItem,
  updateProductQuantity,
  getCheckout,
  getSuccess,getCancel
} = require('../controllers/shopController')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get('/cart', getCart)
router.post('/cart', addToCart)
router.delete('/cart/:id', deleteCartItem)
router.delete('/clear-cart', clearCart)
router.patch('/update-cart', updateProductQuantity)
router.get('/checkout', isLoggedIn, getCheckout)
router.get('/checkout/success', isLoggedIn, getSuccess)
router.get('/checkout/cancel', isLoggedIn, getCancel)

module.exports = router
