const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true
    },
    title: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
    category: { type: String, lowercase: true, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    manufacturer: { type: String, lowercase: true },
    rating: { type: Number },
    available: {
      type: Boolean,
      required: true
    },
    images: [
      {
        url: String,
        filename: String
      }
    ],
    numReviews: { type: Number },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true },
  { strict: false }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
