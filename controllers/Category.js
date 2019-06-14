const Categories = require('../models/categories')

module.exports.categoryManager = (req, res) => {
  res.render('admin/dashboard/post/categories', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postCategory = (req, res) => {
  const { _csrf, ...postData } = req.body

  if (!(postData.title).trim()) {
    res.send({ message: "Không được để trống" })
  }

  category = Categories.findOne({ title: (postData.title).trim() })
  .then((doc) => {
    if (doc) {
      res.send({ message: "Thể loại trùng" })
    } else {
      newCategory = new Categories({
        title: postData.title
      })

      try {
        newCategory.save()
        res.status(201).send({ message: "Thêm thành công" })
      } catch(err) {
        res.send({ message: "Lỗi" })
      }
    }
  })
  .catch(err => {
    res.send({ message: "Lỗi" })
  })
}

module.exports.categoryData = async (req, res) => {
  const categories = await Categories.find({}, "_id title")

  res.send({ results: categories })
}

module.exports.searchCategories = async (req, res) => {
  let categories = await Categories.find({ title: { $regex: '.*' + req.query.p + '.*' } })
  res.send({ results: categories })
}

module.exports.deleteCategory = async (req, res) => {
  try {
    let deleteCategory = await Categories.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: "Xóa thành công" })
  } catch(err) {
    res.send({ message: "Lỗi" })
  }
}