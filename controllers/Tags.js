const Tags = require('../models/tags')

module.exports.tagManager = (req, res) => {
  res.render('admin/dashboard/post/tags', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postTag = async (req, res) => {
  const {_csrf, ...postData} = req.body
  console.log(postData)
  let tag = await Tags.findOne({ title: postData.title })
  console.log(all)
  if (!tag && postData.title !== "") {
    let newTag = new Tags({
      title: postData.title
    })
    await newTag.save()
    res.send({ message: "done" })
  } else {
    res.send({ message: "error" })
  }
}

module.exports.dataTags = async (req, res) => {
  const tags = await Tags.find({})
  let tagList = []
  for (tag of tags) {
    tagList.push(tag.title)
  }
  res.send(tagList)
}