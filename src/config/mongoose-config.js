const mongoose = require('mongoose')

const initMongoose = () => mongoose.connect('mongodb://localhost:27017/testAuth')

module.exports = initMongoose