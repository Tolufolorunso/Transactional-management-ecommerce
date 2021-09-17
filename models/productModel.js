const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: String,
    color: String,
    size: Number,
    images: [
      {
        url: String,
        filename: String
      }
    ],
    price: { type: Number, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true },
  { strict: false }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
