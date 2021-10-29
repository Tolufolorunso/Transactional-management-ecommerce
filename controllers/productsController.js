const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

const ITEMS_PER_PAGE = 15;

exports.getProductForm = (req, res, next) => {
  if (req.user.role === 'buyer') {
    return res.redirect('/products');
  }
  res.render('products/addProduct', {
    path: '/products/add',
    pageTitle: 'Add Product Page'
  });
};

exports.addProduct = catchAsync(async (req, res, next) => {
  if (req.user.role === 'buyer') {
    return res.redirect('/products');
  }

  if (req.body.available === 'true') {
    req.body.available = true;
  } else {
    req.body.available = false;
  }
  req.body.title = req.body.title;

  const product = new Product({
    ...req.body,
    // productCode: `${req.body.title[0]}${faker.helpers.replaceSymbolWithNumber('####-##########')}`,
    productCode: Math.random(),
    userID: req.user._id
  });

  product.images = req.files.map(file => {
    return { url: file.path, filename: file.filename };
  });

  await product.save();
  req.flash('success', `Product added successfully, create another product`);
  res.status(201).redirect('/products/add');
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

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

  // Pagination
  const page = parseInt(req.query.page, ITEMS_PER_PAGE) || 1;
  const limit = parseInt(req.query.limit, ITEMS_PER_PAGE) || 15;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const totalItems = await Product.find().countDocuments();

  const products = await query;
  console.log(products);
  res.render('products/allProducts', {
    path: '/products',
    pageTitle: 'Products Page',
    time: req.time,
    isAuthenticated: false,
    products: products,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.itemID;
  const product = await Product.findById(id);
  if (!product) {
    req.flash('error', `Product not found.`);
    return res.redirect('/products');
  }
  res.render('products/singleProduct', {
    path: 'shop',
    pageTitle: product.title,
    time: req.time,
    isAuthenticated: false,
    product
  });
});

exports.getProductToEdit = async (req, res, next) => {
  if (req.user.role === 'buyer') {
    return res.redirect('/products');
  }
  const product = await Product.findById(req.params.itemID);
  if (!product) {
    req.flash('info', `Product with ID '${req.params.itemID}' not found`);
    return res.redirect('/users/seller');
  }
  res.render('seller/edit-product', {
    path: '/shop',
    pageTitle: 'Products',
    time: req.time,
    isAuthenticated: false,
    product
  });
};

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.user.role === 'buyer' || req.user.role === 'admin') {
    return res.redirect('/products');
  }
  const product = await Product.findByIdAndUpdate(req.params.itemID, {
    ...req.body
  });
  req.flash('success', `'${product.title}' is updated successfully`);
  res.redirect(`/products/${product._id}`);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  console.log(req.user);

  if (req.user.role === 'buyer') {
    return res.redirect('/products');
  }

  if (req.user.role === 'admin') {
    const product = await Product.findOneAndRemove({
      role: 'admin',
      _id: req.params.itemID
    });
    if (!product) {
      req.flash('info', `Product with ID '${req.params.itemID}' not found`);
      return res.redirect('/users/seller');
    }
    req.flash('success', `'${product.title}' is deleted successfully`);

    return res.status(200).redirect('/users/admin');
  }

  const product = await Product.findOneAndRemove({
    userID: req.user._id,
    _id: req.params.itemID
  });
  if (!product) {
    req.flash('info', `Product with ID '${req.params.itemID}' not found`);
    return res.redirect('/users/seller');
  }

  req.flash('success', `'${product.title}' is deleted successfully`);
  res.redirect('/users/seller');
});
