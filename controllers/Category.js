const Categories = require('../models/categories')

module.exports.categoryManager = (req, res) => {
  res.render('admin/dashboard/post/categories', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postCategory = async (req, res) => {
  const { _csrf, ...postData } = req.body
  console.log(postData)
  category = await Categories.findOne({ title: postData.title })

  if (!category && postData.title !== "") {
    newCategory = new Categories({
      title: postData.title
    })
    await newCategory.save()
    res.send({ message: "done" })
  } else {
    res.send({ message: "error" })
  }
}

module.exports.categoryData = async (req, res) => {
  const categories = await Categories.find({}, "_id title")

  res.send({ results: categories })
}