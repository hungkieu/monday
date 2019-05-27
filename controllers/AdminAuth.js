const User = '../models/users'

module.exports.login = (req, res) => {
    res.render("admin/dashboard/index")
}

module.exports.register = (req, res) => {
    res.render('admin/auth/register', {
      csrfToken: req.csrfToken()
    })
}

module.exports.postRegister = async (req, res) => {
  // console.log(req.body)
  let { _csrf, ...data } = req.body

  let user = await User.findOne({username: data.username})
  res.send('register')
}