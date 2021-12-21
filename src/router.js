const express = require('express')
const authController = require('./controllers/auth-controller')
const itemController = require('./controllers/item-controller')

const router = express.Router()

router.use('/auth', authController)
router.use('/item', itemController)

module.exports = router;
