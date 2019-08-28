const mongoose = require('mongoose')
const Assignment = require('./assignment')

// helper function to validate email
const validateEmail = function(email) {
  const validEmail = /^\S+@\S+\.\S+$/
  return validEmail.test(email)
}

const schema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true,
    validate: [validateEmail, 'Email address is not valid']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  admin: {
    type: Boolean,
    default: false,
    required: true
  },
  assignments : [Assignment]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)
