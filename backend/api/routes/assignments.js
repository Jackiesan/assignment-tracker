const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

const excludeKeys = '-__v -password'

// list of assignments
// user must be logged in

router.get('/:userId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200
  const query = { _id: req.params.userId }
  const response = await User.find(query).select('assignments')
  res.json({ status, response })
})

module.exports = router;
