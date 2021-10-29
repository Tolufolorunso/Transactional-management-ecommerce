const express = require('express');
const {
  adminDashboard,
  adminAddProduct,
  order,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser
} = require('../controllers/adminController');
const { authorizeFor } = require('../middlewares/authorize');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

const router = express.Router();

// admin
router.get('/', isLoggedIn, authorizeFor('admin'), adminDashboard);
router.get('/add-product', adminAddProduct);
router.get('/order', order);
router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);
router.patch('/:userId', updateUser);
router.post('/', createUser);

module.exports = router;
