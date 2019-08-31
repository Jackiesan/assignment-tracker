const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn } = require('../middleware/auth')

const excludeKeys = '-__v -password'

router.get('/', isLoggedIn, async (req, res, next) => {
  const status = 200
  const response = await User.find(req.query).select(excludeKeys)
  res.json({ status, response })
})

module.exports = router
