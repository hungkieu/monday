const mongoose = require('mongoose')
const Categories = require('./categories')
const Tags = require('./tags')
const User = require('./users')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Categories
  },
  postBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
})

const Posts = mongoose.model('Posts', postSchema, 'posts')
module.exports = Posts