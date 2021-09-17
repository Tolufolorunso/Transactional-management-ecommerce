const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
