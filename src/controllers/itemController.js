const express = require('express');
const itemServices = require('../services/itemServices');
const middlewares = require('../services/middlewares');

const router = express.Router();

const itemCreate = async (req, res, next) => {
  const item = { ...req.body, ownerId: req.user.id };
  try {
    const createdItem = await itemServices.createItem(item);
    res.status(201).json({ status: 'success', data: createdItem });
  } catch (error) {
    next(error);
  }
};

const getSingleItem = async (req, res, next) => {
  try {
    const item = await itemServices.getSingleItem(req.params.id);
    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

const getMyItems = async (req, res) => {
  try {
    const items = await itemServices.getMyItems(req.user.id);
    res.status(200).json({ status: 'success', data: items });
  } catch (error) {
    next(error);
  }
};

const itemDelete = async (req, res) => {
  try {
    await itemServices.deleteItem(req.params.id);
    res.status(204).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const itemUpdate = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedItem = await itemServices.updateItem(id, req.body);
    res.status(200).json({ status: 'success', data: updatedItem });
  } catch (error) {
    next(error);
  }
};

router.get('/', middlewares.isGuest, getMyItems);
router.post('/', middlewares.isGuest, itemCreate);
router.get('/:id', middlewares.isGuest, middlewares.isOwner, getSingleItem);
router.delete('/:id', middlewares.isGuest, middlewares.isOwner, itemDelete);
router.put('/:id', middlewares.isGuest, middlewares.isOwner, itemUpdate);

module.exports = router;
