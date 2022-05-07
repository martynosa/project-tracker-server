const itemModel = require('../config/models/item-model')

const getMyItems = (userId) => itemModel.find({ ownerId: userId })

const getSingleItem = (itemId) => itemModel.findById(itemId).lean()

const createItem = (itemToCreate) => itemModel.create(itemToCreate)

const deleteItem = (idToDelete) => itemModel.findByIdAndDelete(idToDelete)

const updateItem = (idToUpdate, newItem) => itemModel.findByIdAndUpdate(idToUpdate, newItem, { runValidators: true })

const services = {
    getSingleItem,
    getMyItems,
    createItem,
    deleteItem,
    updateItem,
}

module.exports = services