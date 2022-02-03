const mongoose = require('mongoose')

const initMongoose = () => mongoose.connect('mongodb+srv://martynosa:projecttracker@cluster0.goiey.mongodb.net/test')

module.exports = initMongoose