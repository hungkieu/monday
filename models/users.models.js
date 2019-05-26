const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullname: String,
  username: { type: String, unique: true, trim: true },
  password: { type: String, trim: true }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User