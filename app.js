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
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Require passport for authentication
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/userModel')
const AppError = require('./utils/appError')

const app = express()

const sessionConfigs = {
  secret: 'secretwillbechange',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfigs))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(`${__dirname}/public`))

// Template Engine
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.use(cors())

app.options('*', cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP'
})

app.use('/', limiter)
app.use(sanitizeData())
app.use(xss())

//prevent parameter pollution
app.use(hpp())

app.use(methodOverride('_method'))
app.use(express.json())
// app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(compression())

app.use(async (req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.info = req.flash('info')
  next()
})

// HOMEPAGE route
app.get('/', (req, res) => {
  // if (req.user) {
  //   return res.redirect('/products')
  // }
  res.render('home', {
    path: '/',
    pageTitle: 'Home Page'
  })
})

// Authentication Route
app.use(require('./routes/authRoute'))

// Users Route
// app.use('/api/v1/users', require('./routes/userRoute'))

// Products Route
app.use('/products', require('./routes/productsRoute'))

// Other Route like about us page, contact etc
app.use(require('./routes/shopRoute'))

// Other Route like about us page, contact etc
app.use(require('./routes/otherRoute'))

//Handling unhandle routes
app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'something went wrong', status } = err
  console.log(err)
  if (statusCode === 404) {
    return res.status(statusCode).render('404', { path: '/404', pageTitle: '404' })
  }
  res.status(statusCode).render('error', { path: '/error', pageTitle: 'Something went wrong' })
})
module.exports = app
