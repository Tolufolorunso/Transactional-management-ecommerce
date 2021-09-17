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
const router = express.Router()

const { storage } = require('../services/cloudinary')

const upload = multer({ storage })

router.get('/', getAllProducts)
router.get('/add', getProductForm)

router.get('/:itemID', getProduct)
router.get('/:itemID/edit', getProductToEdit)
router.put('/:itemID', updateProduct)
router.delete('/:itemID', deleteProduct)
router.post('/', upload.array('images', 12), addProduct)

// router.route('/login').get(loginForm)

module.exports = router
