const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn } = require('../middleware/auth')

const excludeKeys = '-__v -password'

// GET api/users
router.get('/', isLoggedIn, async (req, res, next) => {
  const status = 200
  const students = await User.find(req.query).select(excludeKeys)

  const studentList = []
  for (let i=0; i < students.length; i++) {
    if (students[i]['admin'] == false) {
      studentList.push(students[i])
    }
  }
  res.json({ status, studentList })
})

module.exports = router
