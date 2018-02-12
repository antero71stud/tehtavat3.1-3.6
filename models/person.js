const mongoose = require('mongoose')

const url = 'mongodb://<username>:<password>:@ds135186.mlab.com:35186/full-stack-persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person