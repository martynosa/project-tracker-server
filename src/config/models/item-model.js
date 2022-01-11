const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['personal', 'work']
    },
    keywords: {
        type: Array
    },
    description: {
        type: String,
    },
    toDos: {
        type: Object,
    },
    status: {
        type: String,
        enum: ['new', 'inProgress', 'completed', 'archived']
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const itemModel = mongoose.model('item', itemSchema)

module.exports = itemModel