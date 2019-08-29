const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')

const excludeKeys = '-__v -password'

// GET api/admin/assignments/ungraded
router.get('/ungraded', isLoggedIn, isAdmin, async (req, res, next) => {
  const status = 200

  const students = await User.find().select('-__v')

  const ungradedAssignments = []

  for(let i=0; i < students.length; i++) {
    const assignments = students[i]['assignments']
    for(let i=0; i < assignments.length; i++) {
      if (assignments[i]['grade'] == null) {
        ungradedAssignments.push(assignments[i])
      }
    }
  }

  res.json({ status, ungradedAssignments })
})

module.exports = router
