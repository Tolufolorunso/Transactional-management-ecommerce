const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'seller', 'buyer'] },
  review: [{ type: String }],
  active: { type: Boolean, default: true }
})

module.exports = mongoose.model('User', userSchema)
