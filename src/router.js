const express = require('express')
const authController = require('./controllers/auth-controller')
const itemController = require('./controllers/item-controller')

const router = express.Router()

router.use('/auth', authController)
router.use('/items', itemController)
router.use('*', (req, res) => {
    res.send('404')
})

module.exports = router
