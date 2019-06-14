const express = require('express');
const path = require('path');
const fs = require("fs");
const routers = express.Router();
const adminRouters = express.Router();
const multer = require('multer')
const User = require('./models/users')

const upload = multer()

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
  if(req.signedCookies.userId != undefined) {
    res.locals.userId = req.signedCookies.userId
    next();
  }
  else {
    res.redirect('/admin/login');
  }
}

routers.get('/', ctl('Home@index'));
routers.get('/design', (req, res) => res.render('home/design'));

// namespace admin
routers.use('/admin', adminRouters);
adminRouters.get('/', logged, (req, res) => res.redirect('admin/dashboard'));
adminRouters.get('/dashboard', logged, async (req, res) => {
  const user = await User.findById(res.locals.userId)
  res.render('layouts/dashboard', {
    firstName: user.first_name
  })
});
// Login
adminRouters.get('/login', ctl('AdminAuth@login'));
adminRouters.post('/login', ctl('AdminAuth@postLogin'));
// register
adminRouters.get('/register', ctl('AdminAuth@register'));
adminRouters.post('/register', ctl('AdminAuth@postRegister'));
// Logout
adminRouters.get('/logout', ctl('AdminAuth@logout'))
// Post
adminRouters.get('/posts', ctl('Post@postManager'))
adminRouters.post('/posts', upload.array(), ctl('Post@createPost'))
adminRouters.get('/list-post', ctl('Post@listPost'))
adminRouters.post('/list-post', upload.array(), ctl('Post@onePost'))
// Tags
adminRouters.get('/tags', ctl('Tags@tagManager'))
adminRouters.post('/tags', upload.array(), ctl('Tags@postTag'))
adminRouters.get('/data-tags', ctl('Tags@dataTags'))
// Categories
adminRouters.get('/categories', ctl('Category@categoryManager'))
adminRouters.post('/categories', ctl('Category@postCategory'))
adminRouters.delete('/categories/:id', ctl('Category@deleteCategory'))
adminRouters.get('/data-categories', ctl('Category@categoryData'))
adminRouters.get('/search-categories', ctl('Category@searchCategories'))

module.exports = routers;
