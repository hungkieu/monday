const mongoose = require('mongoose')
const Categories = require('./categories')
const Tags = require('./tags')
const User = require('./users')

const postSchema = new mongoose.Schema({
  titile: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Tags
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Categories
  }],
  postBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
})

const Posts = mongoose.model('Posts', postSchema, 'posts')
module.exports = Posts