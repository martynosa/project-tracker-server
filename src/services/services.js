const itemModel = require('../config/models/item-model')

const getSingleItem = (itemId) => itemModel.findById(itemId).lean()

const createItem = (itemToCreate) => itemModel.create(itemToCreate)

const deleteItem = (idToDelete) => itemModel.findByIdAndDelete(idToDelete)

const editItem = (id, editedItem) => itemModel.findByIdAndUpdate(id, editedItem, { runValidators: true })

//! shows duplicates
const search = async (searchCriteria) => {
    let results = await getAllGames()
    if (searchCriteria) {
        const byTitle = results.filter(g => g.title.toLowerCase().includes(searchCriteria.toLowerCase()))
        const byGanre = results.filter(g => g.ganre.toLowerCase().includes(searchCriteria.toLowerCase()))
        const byYear = results.filter(g => g.releaseYear == Number(searchCriteria))
        results = [...byTitle, ...byGanre, ...byYear]
    };
    return results
};

const services = {
    getSingleItem,
    createItem,
    deleteItem,
    editItem,
    search
}

module.exports = services