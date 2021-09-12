const mongoose = require('mongoose')

const connectDB = url => {
  console.log(4, url)
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
    // useFindAndModify: false
  })
}

module.exports = connectDB
