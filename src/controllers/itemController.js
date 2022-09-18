const express = require('express');
const itemServices = require('../services/itemServices');
const middlewares = require('../services/middlewares');

const router = express.Router();

const itemCreate = async (req, res, next) => {
  const item = { ...req.body, ownerId: req.user.id };
  try {
    const createdItem = await itemServices.createItem(item);
    res.status(200).json({
      status: 'Success',
      data: createdItem,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleItem = async (req, res, next) => {
  try {
    const item = await itemServices.getSingleItem(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const getMyItems = async (req, res) => {
  try {
    const items = await itemServices.getMyItems(req.user.id);
    res.status(200).json({ status: 'Success', data: items });
  } catch (error) {
    next(error);
  }
};

const itemDelete = async (req, res) => {
  try {
    const deletedItem = await itemServices.deleteItem(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: deletedItem,
    });
  } catch (error) {
    next(error);
  }
};

const itemUpdate = async (req, res) => {
  res.send('update route');
};

router.get('/', middlewares.isGuest, getMyItems);
router.post('/', middlewares.isGuest, itemCreate);
router.get('/:id', middlewares.isGuest, middlewares.isOwner, getSingleItem);
router.delete('/:id', middlewares.isGuest, middlewares.isOwner, itemDelete);
router.put('/:id', middlewares.isGuest, middlewares.isOwner, itemUpdate);

module.exports = router;
