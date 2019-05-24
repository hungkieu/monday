const Users = require("../models/users.models")

module.exports.login = (req, res) => {
  res.render("auth/login")
}

module.exports.postLogin = (req, res) => {
  const username = req.body.username
  const password = req.body.password

  Users.authenticate(username, password, function(err, user) {
    if (err || !user) {
      return res.redirect("/auth/login")
    } else {
      res.cookie("userID", user.id, {
        signed: true
      })
      res.redirect('/users/index')
    }
  })
}