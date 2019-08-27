const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generateToken } = require('../lib/token')

router.post('/signup', async (req, res, next) => {
  const { email_address, password, first_name, last_name } = req.body
  const alreadyExists = await User.findOne({ email_address })
  if (alreadyExists) {
    const error = new Error(`Email address '${email_address}' is already taken.`)
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
})

module.exports = router
