const express = require('express');
const authController = require('./controllers/authController');
const itemController = require('./controllers/itemController');
const AppError = require('./services/errors/AppError');

const router = express.Router();

router.use('/auth', authController);
router.use('/items', itemController);
router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = router;
