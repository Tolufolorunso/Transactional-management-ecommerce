const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true },
  { strict: false }
)

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
