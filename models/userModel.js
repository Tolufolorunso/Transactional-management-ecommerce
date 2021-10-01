const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const bcrypt = require('bcryptjs')

const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'seller', 'buyer'] },
  review: [{ type: String }],
  active: { type: Boolean, default: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true },
        subtotal: Number
      }
    ],
    totalPrice: Number
  }
})

UserSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString()
  })
  let newQuantity = 1
  const updatedCartItems = [...this.cart.items]

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItems[cartProductIndex].quantity = newQuantity
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    })
  }
  const updatedCart = {
    items: updatedCartItems
  }
  console.log(updatedCart)
  this.cart = updatedCart
  return this.save()
}

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

module.exports = mongoose.model('User', UserSchema)
