const csrf = require('csurf')

const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')
const Cart = require('../models/cartModel')

exports.getCart = catchAsync(async (req, res) => {
  try {
    // find the cart, whether in session or in db based on the user state
    let cart_user
    if (req.user) {
      cart_user = await Cart.findOne({ user: req.user._id })
    }

    // if user is signed in and has cart, load user's cart from the db
    if (req.user && cart_user) {
      req.session.cart = cart_user
      return res.render('shop/cart', {
        pageTitle: 'Shopping Cart Page',
        path: '/cart',
        cart: cart_user,
        products: await productsFromCart(cart_user)
      })
    }
    // if there is no cart in session and user is not logged in, cart is empty
    if (!req.session.cart) {
      return res.render('shop/cart', {
        pageTitle: 'Shopping Cart Page',
        path: '/cart',
        cart: null,
        products: null
      })
    }
    // otherwise, load the session's cart
    return res.render('shop/cart', {
      cart: req.session.cart,
      pageTitle: 'Shopping Cart Page',
      path: '/cart',
      products: await productsFromCart(req.session.cart)
    })
  } catch (err) {
    console.log(err.message)
    res.redirect('/')
  }
})

// GET: add a product to the shopping cart when "Add to cart" button is pressed
exports.addToCart = catchAsync(async (req, res) => {
  // const productId = req.params.id
  const productId = req.body.productId
  try {
    // get the correct cart, either from the db, session, or an empty cart.
    let user_cart
    if (req.user) {
      user_cart = await Cart.findOne({ user: req.user._id })
    }
    let cart
    if ((req.user && !user_cart && req.session.cart) || (!req.user && req.session.cart)) {
      cart = await new Cart(req.session.cart)
    } else if (!req.user || !user_cart) {
      cart = new Cart({})
    } else {
      cart = user_cart
    }

    // add the product to the cart
    const product = await Product.findById(productId)
    const itemIndex = cart.items.findIndex(p => p.productId == productId)
    if (itemIndex > -1) {
      // if product exists in the cart, update the quantity
      cart.items[itemIndex].qty++
      cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price
      cart.totalQty++
      cart.totalCost += product.price
    } else {
      // if product does not exists in cart, find it in the db to retrieve its price and add new item
      cart.items.push({
        productId: productId,
        qty: 1,
        price: product.price,
        title: product.title,
        imagePath: product.images[0].url,
        productCode: product.productCode
      })
      cart.totalQty++
      cart.totalCost += product.price
    }

    // if the user is logged in, store the user's id and save cart to the db
    if (req.user) {
      cart.user = req.user._id
      await cart.save()
    }
    req.session.cart = cart
    req.flash('success', 'Item added to the shopping cart')
    // res.redirect(req.headers.referer)
    res.redirect('/cart')
  } catch (err) {
    console.log(err.message)
    res.redirect('/cart')
  }
})

exports.clearCart = catchAsync(async (req, res) => {
  // const user = await User.findByIdAndUpdate(req.user._id, { $set: { cart: { items: [] } } })
  let cart
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart)
    }
    req.session.cart = null
    await Cart.findByIdAndRemove(cart._id)
    res.redirect('/cart')
  } catch (err) {
    console.log(err.message)
    res.redirect('/cart')
  }
})

exports.updateProductQuantity = catchAsync(async (req, res) => {
  const { quantity, id } = req.body
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
    // res.status(200).json({
    //   msg: 'hello'
    // })
  } catch (error) {
    console.log(error)
  }
})

exports.deleteCartItem = catchAsync(async (req, res) => {
  const productId = req.params.id
  let cart
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart)
    }

    //fnd the item with productId
    let itemIndex = cart.items.findIndex(p => p.productId == productId)
    if (itemIndex > -1) {
      //find the product to find its price
      cart.totalQty -= cart.items[itemIndex].qty
      cart.totalCost -= cart.items[itemIndex].price
      await cart.items.remove({ _id: cart.items[itemIndex]._id })
    }
    req.session.cart = cart
    //save the cart it only if user is logged in
    if (req.user) {
      await cart.save()
    }
    //delete cart if qty is 0
    if (cart.totalQty <= 0) {
      req.session.cart = null
      await Cart.findByIdAndRemove(cart._id)
    }
    res.redirect('/cart')
  } catch (err) {
    console.log(err.message)
    res.redirect('/')
  }
})

exports.checkout = catchAsync(async (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'checkout Page',
    path: '/checkout'
    // total: cart.totalCost,
    // csrfToken: req.csrfToken(),
    // errorMsg,
  })
})

// create products array to store the info of each product in the cart
async function productsFromCart(cart) {
  let products = [] // array of objects
  for (const item of cart.items) {
    let foundProduct = (await Product.findById(item.productId).populate('category')).toObject()
    foundProduct['qty'] = item.qty
    foundProduct['totalPrice'] = item.price
    products.push(foundProduct)
  }
  return products
}
