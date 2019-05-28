const Categories = require('../models/categories')

module.exports.categoryManager = (req, res) => {
  res.render('admin/dashboard/post/categories', {
    csrfToken: req.csrfToken()
  })
}