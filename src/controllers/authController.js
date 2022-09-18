const express = require('express');
const authServices = require('../services/authServices');
const itemServices = require('../services/itemServices');
const middlewares = require('../services/middlewares');
const multerServices = require('../config/multerConfig');
const defaultProject = require('../helpers/defaultProject');

const router = express.Router();

const registerUser = async (req, res, next) => {
  const userToRegister = req.body;
  try {
    await authServices.registerUser(userToRegister);
    const loggedUser = await authServices.logUser(userToRegister);
    const token = await authServices.createToken(loggedUser);
    await itemServices.createItem({
      ...defaultProject,
      ownerId: loggedUser._id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        id: loggedUser._id,
        email: loggedUser.email,
        photo: loggedUser.photo,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logUser = async (req, res, next) => {
  const userToLog = req.body;
  try {
    const loggedUser = await authServices.logUser(userToLog);
    const token = await authServices.createToken(loggedUser);
    res.status(200).json({
      status: 'success',
      data: {
        id: loggedUser._id,
        email: loggedUser.email,
        photo: loggedUser.photo,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const profilePhoto = async (req, res, next) => {
  if (!req.file) {
    next('Not an image file or no file chosen!', 415);
  }
  try {
    const updatedUser = await authServices.updateUser(req.user.id, {
      photo: req.file.filename,
    });
    res.status(200).json({
      status: 'success',
      data: updatedUser.photo,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const userId = req.user.id;
  const passwords = req.body;
  try {
    const userToLog = await authServices.updatePassword(userId, passwords);
    const loggedUser = await authServices.logUser(userToLog);
    const token = await authServices.createToken(loggedUser);
    res.status(200).json({
      status: 'success',
      data: {
        id: loggedUser._id,
        email: loggedUser.email,
        photo: loggedUser.photo,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post('/register', registerUser);
router.post('/login', logUser);
router.post(
  '/uploadPhoto',
  middlewares.isGuest,
  multerServices.uploadProfilePhoto,
  multerServices.resizeProfilePhoto,
  profilePhoto
);

router.post('/updatePassword', middlewares.isGuest, updatePassword);

module.exports = router;
