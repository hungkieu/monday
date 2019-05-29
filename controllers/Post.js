const Post = require('../models/posts')
const Category = require('../models/categories')
const User = require('../models/users')

module.exports.postManager = (req, res) => {
  res.render('admin/dashboard/post/index', {
    csrfToken: req.csrfToken()
  })
}

module.exports.createPost = async (req, res) => {
  const { _csrf, ...postData } = req.body
  console.log(postData)
  const tags = postData.tags.split(",")
  let userId = req.signedCookies.userId
  if (postData.title && postData.content && postData.category  && userId) {
    let newPost = new Post({
      title: postData.title,
      content: postData.content,
      tags: [...tags],
      category: postData.category,
      postBy: userId
    })
    await newPost.save()
    res.send({ message: "done" })
  } else {
    res.send({ message: "error" })
  }
}

module.exports.listPost = async (req, res) => {
  const posts = await Post.find({})
  let list_post = []
  for (post of posts) {
    const { _id, title } = post
    list_post.push({ "id": _id, "title": title })
  }
  res.render('admin/dashboard/post/list_post', {
    posts: list_post,
    csrfToken: req.csrfToken()
  })
}

module.exports.onePost = async (req, res) => {
  const { _csrf, idPost } = req.body
  console.log(idPost)
  const post = await Post.findById(idPost)
  console.log(post)
  res.send(post)
}