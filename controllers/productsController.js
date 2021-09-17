const Product = require('../models/productModel')

exports.getProductForm = (req, res, next) => {
  res.render('products/addProduct', {
    path: '/products/add',
    pathName: 'Add Product Page'
  })
}

exports.addProduct = async (req, res, next) => {
  try {
    const { title, price, description, stock, category } = req.body
    console.log(title, price, description, stock, category, req.files)
    const product = new Product({
      title,
      price,
      description,
      stock,
      category,
      userID: req.user._id
    })
    product.images = req.files.map(file => {
      return { url: file.path, filename: file.filename }
    })
    await product.save()
    res.status(201).redirect('/products')
  } catch (error) {
    console.log(error)
    // res.status(400).render('404')
  }
}
exports.getAllProducts = async (req, res, next) => {
  console.log('shop')
  try {
    const products = await Product.find({})
    console.log(products)

    products.__v = undefined
    res.render('products/allProducts', {
      path: 'products',
      pathName: 'Products Page',
      time: req.time,
      isAuthenticated: false,
      products
    })
  } catch (error) {
    res.status(400).render('404')
  }
}

exports.getProduct = async (req, res, next) => {
  console.log(49, req.params.itemID)
  try {
    const product = await Product.findById(req.params.itemID)
    res.render('products/singleProduct', {
      path: 'shop',
      pathName: product.title,
      time: req.time,
      isAuthenticated: false,
      product
    })
  } catch (error) {
    console.log(error)
    res.status(400).render('404')
  }
}

exports.getProductToEdit = async (req, res, next) => {
  console.log(req.params.itemID)
  try {
    const product = await Product.findById(req.params.itemID)
    res.render('products/editProduct', {
      path: '/shop',
      pathName: 'Products',
      time: req.time,
      isAuthenticated: false,
      product
    })
  } catch (error) {
    console.log(error)
    res.status(400).render('404')
  }
}

exports.updateProduct = async (req, res, next) => {
  console.log(req.params)
  try {
    const product = await Product.findByIdAndUpdate(req.params.itemID, { ...req.body })
    res.redirect(`/products/${product._id}`)
  } catch (error) {
    console.log(error)
    res.status(400).render('404')
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.itemID)
    res.redirect('/products')
  } catch (error) {
    console.log(error)
    res.status(400).render('404')
  }
}
