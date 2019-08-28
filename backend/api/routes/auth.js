const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generateToken } = require('../lib/token')

// /signup
router.post('/signup', async (req, res, next) => {
  try {
    const { email_address, password, first_name, last_name } = req.body
    const alreadyExists = await User.findOne({ email_address })
    if (alreadyExists) {
      const error = new Error(`Email address '${email_address}' is already taken.`)
      error.status = 400

      return next(error)
    }

    if (password.length < 8) {
      const error = new Error(`Password needs to be at least 8 characters long`)
      error.status = 400

      return next(error)
    }

    if (!first_name) {
      const error = new Error(`First name is required`)
      error.status = 400

      return next(error)
    }

    if (!last_name) {
      const error = new Error(`Last name is required`)
      error.status = 400

      return next(error)
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const status = 201
    const user = await User.create({
      email_address,
      password: hashedPassword,
      first_name,
      last_name
    })

    const token = generateToken(user._id)
    res.status(status).json({ status, token })
  } catch (e) {
    console.error(e.errors)
    const error = new Error(`Unable to create user`)
    error.status = 400
    next(error)
  }
})

// /login

module.exports = router
