const express = require('express');
const path = require('path');
const fs = require("fs");
const routers = express.Router();
const adminRouters = express.Router();

var controllerPath = path.join(__dirname, "controllers");
fs.readdirSync(controllerPath).forEach(function (file) {
  let name = file.replace('.js', '');
  global[name] = require("./controllers/" + file);
});

function ctl(ctl_act) {
  var [ctl, act] = ctl_act.split('@');
  return global[ctl][act];
}

const logged = function(req, res, next) {
  if(req.signedCookies.userId != undefined) next();
  else res.redirect('/admin/login');
}

routers.get('/', ctl('Home@index'));
routers.get('/design', (req, res) => res.render('home/design'));

// namespace admin
routers.use('/admin', adminRouters);
adminRouters.get('/', logged, (req, res) => res.redirect('admin/dashboard'));
adminRouters.get('/dashboard', logged, (req, res) => res.render('admin/dashboard/index'));
// Login
adminRouters.get('/login', ctl('AdminAuth@login'));
adminRouters.post('/login', ctl('AdminAuth@postLogin'));
// register
adminRouters.get('/register', ctl('AdminAuth@register'));
adminRouters.post('/register', ctl('AdminAuth@postRegister'));
// Logout
<<<<<<< HEAD
adminRouters.get('/logout', ctl('AdminAuth@logout'))
// Post
adminRouters.get('/posts', ctl('Post@postManager'))
// Tags
adminRouters.get('/tags', ctl('Tags@tagManager'))
// Categories
adminRouters.get('/categories', ctl('Category@categoryManager'))
=======
adminRouters.get('/logout', ctl('AdminAuth@logout'));
>>>>>>> 7bd2dc9a2be617874b59d0642efa5eb6a48acbd9

module.exports = routers;
