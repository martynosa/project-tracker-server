const express = require('express')

const services = require('../services/services')
const authServices = require('../services/authServices')
const middlewares = require('../services/middlewares')

const router = express.Router()

const itemCreate = async (req, res) => {
    const item = { ...req.body }
    try {
        const createdItem = await services.createItem(item)
        await authServices.addToCreatedItems(req.body.ownerId, createdItem._id)
        res.status(200).json({ createdItem })
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
        console.log(error);
        res.status(500).json(error.message)
    }
}

const getAllItems = async (req, res) => {
    try {
        const allItems = await services.getAllItems()
        res.status(200).json({ allItems })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

router.post('/create', middlewares.isGuest, itemCreate)
router.get('/:id/delete', middlewares.isGuest, middlewares.isOwner, itemDelete)
router.get('/browse', getAllItems)

module.exports = router
