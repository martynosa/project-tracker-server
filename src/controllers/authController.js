const express = require('express');
const authServices = require('../services/authServices');
const itemServices = require('../services/itemServices');
const middlewares = require('../services/middlewares');
const uploadProfilePhoto = require('../config/multerConfig');
const mongoErrorHandler = require('../services/errorServices');

const router = express.Router();

const registerUser = async (req, res) => {
  const userToRegister = req.body;
  const defaultProject = {
    name: 'Project Mars (Demo)',
    keywords: ['MARS', 'LANDING', 'HUMANS'],
    description: 'The first crewed mission to Mars.',
    status: 'new',
    tasks: [
      {
        task: 'Rover exploration.',
        key: '1',
        isCompleted: true,
      },
      {
        task: 'Send base components',
        key: '2',
        isCompleted: false,
      },
      {
        task: 'Send crew to Mars.',
        key: '3',
        isCompleted: false,
      },
      {
        task: 'Build base.',
        key: '4',
        isCompleted: false,
      },
      {
        task: 'Return crew from Mars.',
        key: '5',
        isCompleted: false,
      },
    ],
  };

  try {
    await authServices.registerUser(userToRegister);
    const loggedUser = await authServices.logUser(userToRegister);
    const token = await authServices.createToken(loggedUser);
    await itemServices.createItem({
      ...defaultProject,
      ownerId: loggedUser._id,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        id: loggedUser._id,
        username: loggedUser.username,
        photo: loggedUser.photo,
        token: token,
      },
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const logUser = async (req, res) => {
  const userToLog = req.body;
  try {
    const loggedUser = await authServices.logUser(userToLog);
    const token = await authServices.createToken(loggedUser);
    res.status(200).json({
      status: 'Success',
      data: {
        id: loggedUser._id,
        username: loggedUser.username,
        photo: loggedUser.photo,
        token: token,
      },
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

const profilePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(500).json({
      status: 'Error',
      message: 'Not an image file or no file chosen!',
    });
  }
  try {
    const updatedUser = await authServices.updateUser(req.user.id, {
      photo: req.file.filename,
    });
    res.status(200).json({
      status: 'Success',
      data: updatedUser.photo,
    });
  } catch (error) {
    const message = mongoErrorHandler(error);
    res.status(500).json({ status: 'Error', message });
  }
};

router.post('/register', registerUser);
router.post('/login', logUser);
router.post(
  '/uploadPhoto',
  middlewares.isGuest,
  uploadProfilePhoto,
  profilePhoto
);

module.exports = router;
