const express = require('express')
const { authorizeFor } = require('../middlewares/authorize')
const { isLoggedIn } = require('../middlewares/isLoggedIn')

const router = express.Router()


module.exports = router
