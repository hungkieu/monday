const User = '../models/users.models'

module.exports.login = (req, res) => {
    res.render("admin/dashboard/index")
}

module.exports.register = (req, res) => {
    res.render('admin/auth/register', {
      csrfToken: req.csrfToken()
    })
}

module.exports.postRegister = (req, res) => {
  // console.log(req.body)
  let { _csrf, ...data } = req.body

  console.log(data)
  const user = new User({
    fullname: data.fullname,
    username: data.username,
    password: data.password
  })

  user.save((err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
}