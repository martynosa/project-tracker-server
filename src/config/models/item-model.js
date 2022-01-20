const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    keywords: {
        type: Array
    },
    description: {
        type: String,
    },
    tasks: {
        type: Array,
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