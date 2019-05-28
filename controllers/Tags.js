const Tags = require('../models/tags')

module.exports.tagManager = (req, res) => {
  res.render('admin/dashboard/post/tags', {
    csrfToken: req.csrfToken()
  })
}