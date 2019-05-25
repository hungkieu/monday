const express = require('express');
const path = require('path');
const app = express();
const routers = express.Router();
const adminRouters = express.Router();

const logged = function(req, res, next) {
  if(req.signedCookies.user != undefined) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

routers.get('/', (req, res) => res.render('home/index', {title: 'Monday'}));

// namespace admin
routers.use('/admin', adminRouters);
adminRouters.get('/', logged, (req, res) => res.render('admin/dashboard/index'));
adminRouters.get('/login', (req, res) => res.render('admin/auth/login'));
adminRouters.post('/login', (req, res) => {
  res.send(JSON.stringify(req.body));
});

module.exports = routers;
