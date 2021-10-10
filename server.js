const dotenv = require('dotenv')
dotenv.config({
  path: './config.env'
})

const app = require('./app')
const PORT = process.env.PORT || 4000

const connectDB = require('./db/connectDB')

const startServer = async () => {
  // Local DB, comment out when you want to push to githubb
  // const DB = process.env.DATABASE_LOCAL

  // Live DB, uncomment when you want to push to github
  const DB = process.env.DATABASE


  try {
    await connectDB(DB)
    app.listen(PORT, () => {
      console.log(`App runing on port ${PORT} and DB Connection successful`)
    })
  } catch (error) {
    console.log('DATABASE connection failed', error)
  }
}

startServer()
