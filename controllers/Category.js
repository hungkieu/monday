const Categories = require('../models/categories')

module.exports.categoryManager = (req, res) => {
  res.render('admin/dashboard/post/categories', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postCategory = async (req, res) => {
  const { _csrf, ...postData } = req.body
  category = await Categories.findOne({ title: postData.title })

  if (!category && postData.title !== "") {
    newCategory = new Categories({
      title: postData.title
    })
    await newCategory.save()
    res.status(200)
    res.send({ message: "Thêm thành công" })
  } else {
    res.status(500)
    res.send({ message: "Lỗi" })
  }
}

module.exports.categoryData = async (req, res) => {
  const categories = await Categories.find({}, "_id title")

  res.send({ results: categories })
}

module.exports.searchCategories = async (req, res) => {
  categories = await Categories.find({ title: { $regex: '.*' + req.query.p + '.*' } })
  res.send({ results: categories })
}

module.exports.deleteCategory = async (req, res) => {
  console.log(req.params.id)
  try {
    deleteCategory = await Categories.findByIdAndDelete(req.params.id)
  }
  catch(err) {
    res.status(500)
    res.send({ message: "Lỗi" })
  }
  res.status(200)
  res.send({ message: "Xóa thành công" })
}