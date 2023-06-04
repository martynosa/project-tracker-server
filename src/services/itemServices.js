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

const addTask = (idToUpdate, task) =>
  itemModel.findByIdAndUpdate(
    idToUpdate,
    { $push: { tasks: task } },
    { new: true }
  );

const deleteTask = (idToUpdate, taskIdToDelete) =>
  itemModel.findByIdAndUpdate(
    idToUpdate,
    { $pull: { tasks: { _id: taskIdToDelete } } },
    { new: true }
  );

const updateTask = (idToUpdate, taskId, isCompleted) => {
  // const project = await itemModel.findById(idToUpdate);
  // project.tasks.forEach((t) => {
  //   if (t.id === taskId) {
  //     t.isCompleted = isCompleted;
  //   }
  // });
  // const updatedProject = await project.save();
  // return updatedProject;

  return itemModel.findByIdAndUpdate(
    idToUpdate,
    {
      $set: { 'tasks.$[inner].isCompleted': isCompleted },
    },
    {
      arrayFilters: [{ 'inner._id': taskId }],
      new: true,
    }
  );
};

const itemServices = {
  getSingleItem,
  getMyItems,
  createItem,
  deleteItem,
  updateItem,
  addTask,
  deleteTask,
  updateTask,
};

module.exports = itemServices;
