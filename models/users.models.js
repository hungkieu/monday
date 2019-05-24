const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
})

usersSchema.statics.authenticate = (username, password, callback) => {
  Users.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error("user not found")
        err.status = 401

        return callback(err)
      }
      if (password !== user.password) {
        return callback()
      } else {
        return callback(null, user)
      }
    })
}

var Users = new mongoose.model("Users", usersSchema, "users")

module.exports = Users