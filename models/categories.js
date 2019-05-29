const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

const Categories = mongoose.model('Categories', categorySchema, 'categories')
module.exports = Categories