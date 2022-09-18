const itemModel = require('../config/models/itemModel');

const getMyItems = (userId) => itemModel.find({ ownerId: userId });

const getSingleItem = (itemId) => itemModel.findById(itemId);

const createItem = (itemToCreate) => itemModel.create(itemToCreate);

const deleteItem = (idToDelete) => itemModel.findByIdAndDelete(idToDelete);

const updateItem = (idToUpdate, newData) =>
  itemModel.findByIdAndUpdate(idToUpdate, newData, {
    runValidators: true,
    new: true,
  });

const itemServices = {
  getSingleItem,
  getMyItems,
  createItem,
  deleteItem,
  updateItem,
};

module.exports = itemServices;
