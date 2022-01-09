const express = require('express')

const services = require('../services/services')
const authServices = require('../services/authServices')
const middlewares = require('../services/middlewares')

const router = express.Router()

const itemCreate = async (req, res) => {
    const item = { ...req.body, ownerId: req.user.id }
    try {
        const createdItem = await services.createItem(item)
        await authServices.addToCreatedItems(req.user.id, createdItem._id)
        res.status(200).json(createdItem)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const itemDelete = async (req, res) => {
    const idToDelete = req.params.id
    try {
        await services.deleteItem(idToDelete)
        res.status(200).json('Deleted successfully!')
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getMyItems = async (req, res) => {
    try {
        const user = await authServices.getUser(req.user.id)
        res.status(200).json(user.createdItems)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

router.post('/create', middlewares.isGuest, itemCreate)
router.get('/:id/delete', middlewares.isGuest, middlewares.isOwner, itemDelete)
router.get('/browse', getMyItems)

module.exports = router
