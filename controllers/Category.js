const Categories = require('../models/categories')

module.exports.categoryManager = (req, res) => {
  res.render('admin/dashboard/post/categories', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postCategory = async (req, res) => {
  const { _csrf, ...postData } = req.body
  category = await Categories.findOne({ title: (postData.title).trim() })
  console.log(!category)
  console.log(!category && postData.title !== "")
  if (!category && postData.title !== "") {
    newCategory = new Categories({
      title: postData.title
    })
    try {
      await newCategory.save()
      res.status(201).send({ message: "Thêm thành công" })
    } catch(err) {
      res.send({ message: "Lỗi" })
    }

  } else {
    res.send({ message: "Thể loại trùng, hoặc để trống" })
  }
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