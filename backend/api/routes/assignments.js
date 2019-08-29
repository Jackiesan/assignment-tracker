const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')

const excludeKeys = '-__v -password'

// list of assignments
// user must be logged in

// GET api/users/:userId/assignments/
router.get('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200

  const { userId } = req.params
  const query = { _id: userId }
  const user = await User.findOne(query)

  const assignments = user.assignments
  res.status(status).json({ status, response: assignments })
})

// POST api/users/:userId/assignments/
router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 201

  try {
    const { userId } = req.params
    const query = { _id: userId }
    const user = await User.findOne(query)

    user.assignments.push(req.body)
    await user.save()

    const assignment = user.assignments[user.assignments.length - 1]

    res.status(status).json({ status, response: assignment })
  } catch (e) {
    console.error(e.errors)
    const error = new Error(`Unable to create assignment`)
    error.status = 400
    next(error)
  }
})

module.exports = router;
