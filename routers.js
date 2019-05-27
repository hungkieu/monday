const express = require('express');
const path = require('path');
const app = express();
const routers = express.Router();
const adminRouters = express.Router();

function ctl(ctl_act) {
  console.log(ctl_act)
  var [ctl, act] = ctl_act.split('@');
  controller = require('./controllers/' + ctl);
  return controller[act];
}

const logged = function(req, res, next) {
  console.log(req.signedCookies.userId)

  if(req.signedCookies.userId != undefined) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

routers.get('/', ctl('HomeController@index'));
routers.get('/design', (req, res) => res.render('home/design'));

// namespace admin
routers.use('/admin', adminRouters);
adminRouters.get('/dashboard', logged, (req, res) => res.render('admin/dashboard/index'));
// Login
adminRouters.get('/login', ctl('AdminAuth@login'));
adminRouters.post('/login', ctl('AdminAuth@postLogin'));
// register
adminRouters.get('/register', ctl('AdminAuth@register'))
adminRouters.post('/register', ctl('AdminAuth@postRegister'))
// Logout
adminRouters.get('/logout', ctl('AdminAuth@logout'))

module.exports = routers;
