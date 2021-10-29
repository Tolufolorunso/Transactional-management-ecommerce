const express = require('express');
const {
  getSellerDashboard,
  addProduct,
  ProductsSold
} = require('../controllers/sellerController');
const { authorizeFor } = require('../middlewares/authorize');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

const router = express.Router();

// Seller
router.get('/', isLoggedIn, authorizeFor('seller'), getSellerDashboard);
router.get('/products/add', isLoggedIn, authorizeFor('seller'), addProduct);
router.get('/products/sold', isLoggedIn, authorizeFor('seller'), ProductsSold);

module.exports = router;
