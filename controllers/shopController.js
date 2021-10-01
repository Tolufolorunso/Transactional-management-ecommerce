const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')

exports.getCart = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Cart Page | studentvend',
      carts: []
    })
  }
  const user = await req.user.populate('cart.items.productId cart.items.productId.images')
  console.log(user.cart.items.images)
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart Page | studentvend',
    carts: user.cart.items
  })
})

exports.addToCart = async (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => {
      const error = new Error(err)
      error.httpStatusCode = 500
      return next(error)
    })

  // res.redirect('/products/6141f88f911daa55270917af')
}

exports.clearCart = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { $set: { cart: { items: [] } } })
  if (!user) {
    res.redirect('/')
  }
  res.redirect('/cart')
})

exports.updateProductQuantity = catchAsync(async (req, res) => {
  const { quantity, id } = req.body
  console.log(req.body)
  try {
    const user = await User.findById(req.user._id).populate('cart.items.productId')
    // const updatedCart = user.cart.items.map(item => {
    //   if (item.productId._id.toString() === id.toString()) {
    //     return { ...item, quantity }
    //   }
    //   return item
    // })
    // user.cart.item = updatedCart
    // await user.save()

    // // console.log(57, updatedCart)
    // res.status(200).json({
    //   msg: 'hello'
    // })
  } catch (error) {
    console.log(error)
  }
})

exports.deleteCartItem = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedCartItems = req.user.cart.items.filter(item => {
    return item.productId.toString() !== id.toString()
  })
  req.user.cart.items = updatedCartItems
  await req.user.save()
  res.redirect('/cart')
})
