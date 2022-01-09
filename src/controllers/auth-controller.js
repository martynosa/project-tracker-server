const express = require('express')
const authServices = require('../services/authServices')

const router = express.Router()

const registerUser = async (req, res) => {
    const userToRegister = req.body
    try {
        await authServices.registerUser(userToRegister)
        const loggedUser = await authServices.logUser(userToRegister)
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