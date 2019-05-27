const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
})

const User = new mongoose.model('User', userSchema, 'users')

module.exports = User
