const express = require('express');
const itemServices = require('../services/itemServices');
const middlewares = require('../services/middlewares');
const mongoErrorHandler = require('../services/errorServices');

const router = express.Router();

const itemCreate = async (req, res) => {
  const item = { ...req.body, ownerId: req.user.id };
  try {
    const createdItem = await itemServices.createItem(item);
    res.status(200).json({
      status: 'Success',
      data: createdItem,
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const item = await itemServices.getSingleItem(req.params.id);
    if (req.user.id != item.ownerId) {
      return res
        .status(500)
        .json({ status: 'Error', message: 'Not authorized!' });
    }
    res.status(200).json({
      status: 'Success',
      data: item,
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const getMyItems = async (req, res) => {
  try {
    const items = await itemServices.getMyItems(req.user.id);
    res.status(200).json({ status: 'Success', data: items });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const itemDelete = async (req, res) => {
  try {
    const item = await itemServices.getSingleItem(req.params.id);
    if (req.user.id != item.ownerId) {
      return res
        .status(500)
        .json({ status: 'Error', message: 'Not authorized!' });
    }
    const deletedItem = await itemServices.deleteItem(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: deletedItem,
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const itemUpdate = async (req, res) => {
  const newItem = { ...req.body, ownerId: req.user.id };
  try {
    const item = await itemServices.getSingleItem(req.params.id);
    if (req.user.id != item.ownerId) {
      return res
        .status(500)
        .json({ status: 'Error', message: 'Not authorized!' });
    }
    const updatedItem = await itemServices.updateItem(req.params.id, newItem);
    res.status(200).json({ status: 'Success', data: updatedItem });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

router.get('/', middlewares.isGuest, getMyItems);
router.post('/', middlewares.isGuest, itemCreate);
router.get('/:id', middlewares.isGuest, getSingleItem);
router.get('/:id', getSingleItem);
router.delete('/:id', middlewares.isGuest, itemDelete);
router.put('/:id', middlewares.isGuest, itemUpdate);

module.exports = router;
