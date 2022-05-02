const mongoose = require('mongoose')

const initMongoose = () => mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.goiey.mongodb.net/project-tracker`)

module.exports = initMongoose