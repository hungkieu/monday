const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports.login = (req, res) => {
    res.render("admin/auth/login", {
      csrfToken: req.csrfToken()
    })
}

module.exports.postLogin = async (req, res) => {
  const { _csrf, ...data } = req.body
  const user = await User.findOne({username: data.username})
  if (!user) {
    res.render("admin/auth/login", {
      csrfToken: req.csrfToken(),
      error: 'User does not exist'
    })
  }
  console.log(user)
  const user_pass = user.password
  if (bcrypt.compareSync(data.password, user_pass)) {
    res.cookie('userId', user.id, {
      signed: true
    })
    res.redirect('/admin/dashboard')
  } else {
    res.render("admin/auth/login", {
      csrfToken: req.csrfToken(),
      error: 'Wrong password'
    })
  }
  // console.log(check_pass)

  // res.send(data)
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
  if (user) {
    res.render('admin/auth/register', {
      error: "User is exists",
      csrfToken: req.csrfToken()
    })
  } else {
    const hash_pass = bcrypt.hashSync(data.password, 10)
    console.log(hash_pass)
    let user = new User({
      first_name: data.firstname,
      last_name: data.last_name,
      username: data.username,
      password: hash_pass
    })

    await user.save()
    res.cookie('userId', user.id, {
      signed: true
    })
    res.redirect('/admin/dashboard')
  }
  // res.send('register')
}

// Logout
module.exports.logout = (req, res) => {
  res.clearCookie('userId')
  // req.session.destroy()
  res.render("admin/auth/login", {
    csrfToken: req.csrfToken()
  })
}