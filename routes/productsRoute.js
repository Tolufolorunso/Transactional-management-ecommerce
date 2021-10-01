const express = require('express')
const multer = require('multer')

const {
  getProductForm,
  addProduct,
  getAllProducts,
  getProduct,
  getProductToEdit,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const router = express.Router()

const { storage } = require('../services/cloudinary')

const upload = multer({ storage })

router.get('/', getAllProducts)
router.get('/add', isLoggedIn, getProductForm)

router.get('/:itemID', getProduct)
router.get('/:itemID/edit', isLoggedIn, getProductToEdit)
router.put('/:itemID', isLoggedIn, updateProduct)
router.delete('/:itemID', isLoggedIn, deleteProduct)
router.post('/', isLoggedIn, upload.array('images', 12), addProduct)
// router.post('/', isLoggedIn, addProduct)

// router.route('/login').get(loginForm)

module.exports = router
