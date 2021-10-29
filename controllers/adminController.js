const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

const ITEMS_PER_PAGE = 15;

const adminDashboard = catchAsync(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  // Finding resource
  query = Product.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  if (req.query.title) {
    console.log(req.query.title);
  }

  // Pagination
  const page = parseInt(req.query.page, ITEMS_PER_PAGE) || 1;
  const limit = parseInt(req.query.limit, ITEMS_PER_PAGE) || 15;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const totalItems = await Product.find().countDocuments();

  const products = await query;

  res.render('admin/allProducts', {
    path: '/users/admin',
    pageTitle: 'Admin Dashboard',
    time: req.time,
    isAuthenticated: false,
    products: products || [],
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    totalItems: totalItems
  });
});

const adminAddProduct = catchAsync(async (req, res, next) => {
  res.render('seller/addProduct', {
    path: '/users/seller/products/add',
    pageTitle: 'Add Product'
  });
});

const order = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  res.render('admin/allUsers', {
    path: '/users',
    pageTitle: 'All Users'
  });
});
const getUser = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  });
});
const deleteUser = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  });
});
const createUser = catchAsync(async (req, res, next) => {
  res.render('seller/sold-products', {
    path: '/users/seller/products/sold',
    pageTitle: 'Add Product'
  });
});

module.exports = {
  adminDashboard,
  adminAddProduct,
  order,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser
};
