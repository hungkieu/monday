const monngoose = require('mongoose')

const tagSchema = new monngoose.Schema({
  title: {
    type: String,
    required: true
  }
})

const Tags = new monngoose.model('Tags', tagSchema, 'tags')

module.exports = Tags