const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

// Create 10 students
// Create 1 admin

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })

  await User.deleteMany()
  return User.create([
    {
      admin: true,
      email_address: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'Mr.',
      last_name: 'Admin'
    },
    {
      admin: false,
      email_address: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'student',
      last_name: 'last',
      assignments: [
        {
          title: 'Assignment 1',
          link: 'www.github.com/assignment-1',
          description: 'My first assignment'
        }
      ]
    },
    {
      admin: false,
      email_address: 'jake@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'jake',
      last_name: 'smith',
      assignments: [
        {
          title: 'Assignment 1',
          link: 'www.github.com/assignment-1',
          description: 'My first assignment'
        }
      ]
    },
    {
      admin: false,
      email_address: 'helena@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'helena',
      last_name: 'wentworth',
      assignments: [
        {
          title: 'Assignment 3',
          link: 'www.github.com/assignment-3',
          description: 'Ruby on Rails'
        }
      ]
    },
    {
      admin: false,
      email_address: 'james@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'james',
      last_name: 'chang',
      assignments: [
        {
          title: 'Assignment Tracker',
          link: 'www.github.com/assignment-tracker',
          description: 'Final project'
        }
      ]
    },
    {
      admin: false,
      email_address: 'alex@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'alex',
      last_name: 'swift',
      assignments: [
        {
          title: 'Assignment 3',
          link: 'www.github.com/assignment-3',
          description: 'My third assignment'
        }
      ]
    },
    {
      admin: false,
      email_address: 'chris@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'chris',
      last_name: 'stevens',
      assignments: [
        {
          title: 'Javascript project',
          link: 'www.github.com/javascript-project',
          description: 'My final assignment'
        }
      ]
    },
    {
      admin: false,
      email_address: 'vincent@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'vincent',
      last_name: 'johnson',
      assignments: [
        {
          title: 'Assignment 1',
          link: 'www.github.com/assignment-1',
          description: 'Turning this in late'
        }
      ]
    },
    {
      admin: false,
      email_address: 'kaylee@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'kaylee',
      last_name: 'andrews',
      assignments: [
        {
          title: 'Capstone Project',
          link: 'www.github.com/capstone',
          description: 'My capstone project'
        }
      ]
    },
    {
      admin: false,
      email_address: 'brian@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'brian',
      last_name: 'smith',
      assignments: [
        {
          title: 'Assignment 1',
          link: 'www.github.com/assignment-1',
          description: 'My first assignment'
        }
      ]
    },
    {
      admin: false,
      email_address: 'luke@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'luke',
      last_name: 'walker',
      assignments: [
        {
          title: 'Capstone Project',
          link: 'www.github.com/capstone-project',
          description: 'My capstone project',
          score: 40,
          max_score: 50
        }
      ]
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
