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

userSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not exist')
        err.status = 401

        return callback(err)
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return callback(err)
        } else {
          return callback(null, user)
        }
      })
    })
}

const User = new mongoose.model('User', userSchema, 'users')

module.exports = User