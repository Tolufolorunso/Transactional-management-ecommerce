const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    color: String,
    size: Number,
    imageUrl: { type: String, required: true },
    imageArr: { type: Array },
    price: { type: Number, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true },
  { strict: false }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
