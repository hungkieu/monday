const express = require('express');
const path = require('path');
const app = express();
const routers = express.Router();
const adminRouters = express.Router();

function ctl(ctl_act) {
  var [ctl, act] = ctl_act.split('@');
  controller = require('./controllers/' + ctl);
  return controller[act];
}

const logged = function(req, res, next) {
  if(req.signedCookies.user != undefined) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

routers.get('/', ctl('HomeController@index'));
routers.get('/design', (req, res) => res.render('home/design'));

// namespace admin
routers.use('/admin', adminRouters);
adminRouters.get('/', logged, (req, res) => res.render('admin/dashboard/index'));
adminRouters.get('/login', (req, res) => res.render('admin/auth/login'));
adminRouters.post('/login', (req, res) => {
  res.send(JSON.stringify(req.body));
});

module.exports = routers;
