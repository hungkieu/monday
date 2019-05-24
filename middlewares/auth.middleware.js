const Users = require("../models/users.models")

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userID) {
    res.redirect("/auth/login")
    return
  }

  next()
}