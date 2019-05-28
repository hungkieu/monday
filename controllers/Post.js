const Post = require('../models/posts')

module.exports.postManager = (req, res) => {
  res.render('admin/dashboard/post/index', {
    csrfToken: req.csrfToken()
  })
}