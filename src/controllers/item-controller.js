const express = require('express')
const services = require('../services/services')
const middlewares = require('../services/middlewares')

const router = express.Router()

const itemCreate = async (req, res) => {
    const item = { ...req.body, ownerId: req.user.id }
    try {
        const createdItem = await services.createItem(item)
        res.status(200).json(createdItem)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getSingleItem = async (req, res) => {
    try {
        const item = await services.getSingleItem(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getMyItems = async (req, res) => {
    try {
        const projects = await services.getMyItems(req.user.id)
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const itemDelete = async (req, res) => {
    const idToDelete = req.params.id
    try {
        const deletedItem = await services.deleteItem(idToDelete)
        res.status(200).json(deletedItem)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const itemUpdate = async (req, res) => {
    const idToUpdate = req.params.id
    const newItem = { ...req.body, ownerId: req.user.id }
    try {
        const updatedItem = await services.updateItem(idToUpdate, newItem)
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

router.get('/', middlewares.isGuest, getMyItems)
router.post('/', middlewares.isGuest, itemCreate)
router.get('/:id', middlewares.isGuest, middlewares.isOwner, getSingleItem)
router.delete('/:id', middlewares.isGuest, middlewares.isOwner, itemDelete)
router.put('/:id', middlewares.isGuest, middlewares.isOwner, itemUpdate)

module.exports = router
