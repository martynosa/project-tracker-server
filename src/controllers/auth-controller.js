const express = require('express')
const authServices = require('../services/authServices')
const services = require('../services/services')

const router = express.Router()

const registerUser = async (req, res) => {
    const userToRegister = req.body
    const defaultProject = {
        name: 'Project Mars (Demo)',
        keywords: ['MARS', 'LANDING', 'HUMANS'],
        description: 'The first crewed mission to Mars.',
        status: 'new',
        tasks: [
            {
                "task": "Rover exploration.",
                "key": "1",
                "isCompleted": true
            },
            {
                "task": "Send base components",
                "key": "2",
                "isCompleted": false
            },
            {
                "task": "Send crew to Mars.",
                "key": "3",
                "isCompleted": false
            },
            {
                "task": "Build base.",
                "key": "4",
                "isCompleted": false
            }, {
                "task": "Return crew from Mars.",
                "key": "5",
                "isCompleted": false
            }
        ]
    }

    try {
        await authServices.registerUser(userToRegister)
        const loggedUser = await authServices.logUser(userToRegister)
        const token = await authServices.createToken(loggedUser)
        await services.createItem({ ...defaultProject, ownerId: loggedUser._id })
        res.status(200).json({
            id: loggedUser._id,
            username: loggedUser.username,
            token: token
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const logUser = async (req, res) => {
    const userToLog = req.body
    try {
        const loggedUser = await authServices.logUser(userToLog)
        const token = await authServices.createToken(loggedUser)
        res.status(200).json({
            id: loggedUser._id,
            username: loggedUser.username,
            token: token
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

router.post('/register', registerUser)
router.post('/login', logUser)

module.exports = router