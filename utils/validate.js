const { check, body } = require('express-validator')
const User = require('../models/userModel')

const validateRegister = () => {
  return [
      check('name','Name field is required and 4 characters long').isLength({min:4}).trim(),
      check('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .trim()
      .normalizeEmail()
      .custom((value,{req})=> {
        return User.findOne({email: value}).then(userDoc => {
          if(userDoc) {
            return Promise.reject('E-mail exists already, please try another email')
          }
        })
      }),
      body('password')
        .isLength({ min: 3 })
        .isAlphanumeric()
        .trim(),
      body('confirmPassword')
      .trim()
      .custom((value,{req})=>{
        if(value !== req.body.password) {
          throw new Error('Password not matched')
        }
        return true
      })
    ]
}

const validateProduct = () => {
  return [
      check('title','Product name required').isLength({min:2}).trim(),
      check('description','Must be 30 characters long').isLength({min:30}).trim(),
      check('category','Category is required').isLength({min:4}).trim()
    ]
}

module.exports = { validateRegister,validateProduct }
