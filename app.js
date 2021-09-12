const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const compression = require('compression')
const sanitizeData = require('express-mongo-sanitize')
const xss = require('xss-clean')
const helmet = require('helmet')
const hpp = require('hpp')
const ejsMate = require('ejs-mate')

const app = express()

app.use(express.static(`${__dirname}/public`))

// Template Engine
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(helmet())
app.use(cors())

app.options('*', cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP'
})

app.use('/', limiter)
app.use(sanitizeData())
app.use(xss())

//prevent parameter pollution
app.use(hpp())

app.use(express.json({ limit: '100mb' }))

app.use(compression())

// HOMEPAGE route
app.get('/', (req, res) => {
  res.render('home')
})

// Authentication Route
// app.use('/api/v1/auth', require('./routes/authRoute'))

// Users Route
// app.use('/api/v1/users', require('./routes/userRoute'))

// Products Route
// app.use('/api/v1/users', require('./routes/productRoute'))

//Handling unhandle routes
app.all('*', (req, res, next) => {
  res.render('404')
  // res.status(404).json({
  //   status: 'fail',
  //   errorMessage: `Can't find ${req.originalUrl} on this server`
  // })
})

// app.listen(4000, () => {
//   console.log(`App runing on port ${4000} and DB Connection successful`)
// })

module.exports = app
