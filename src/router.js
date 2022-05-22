const express = require('express');
const authController = require('./controllers/authController');
const itemController = require('./controllers/itemController');

const router = express.Router();

router.use('/auth', authController);
router.use('/items', itemController);
router.use('*', (req, res) => {
  res.send('404');
});

module.exports = router;
