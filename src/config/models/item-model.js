const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    toDos: {
        type: Object,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const itemModel = mongoose.model('item', itemSchema)

module.exports = itemModel