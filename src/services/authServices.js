const userModel = require('../config/models/user-model')
const util = require('util')
const jwt = require('jsonwebtoken')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)
const SECRET = '435C846394A839FF96CF9E1BEBF99'

const registerUser = async (userToRegister) => {
    const { username, password, rePassword } = userToRegister

    if (!username || username.trim() === '' || username.length < 4) {
        throw ('Username must be 4 characters or more!')
    }

    if (!password || password.trim() === '' || password.length < 6) {
        throw ('Password must be 5 characters or more!')
    }

    if (!rePassword || rePassword.trim() === '' || password !== rePassword) {
        throw ('Password and Repeat Password must be identical!')
    }

    try {
        await userModel.create(userToRegister)
    } catch (error) {
        throw ('Try different Username or there might be an issue with our servers!')
    }
}

const logUser = async (userToLog) => {
    const { username, password } = userToLog
    const user = await userModel.findOne({ username })
    if (!user) {
        throw ('Username or Password are invalid!')
    }

    if (!password) {
        throw ('Username or Password are invalid!')
    }

    const isValid = await user.validatePassword(password)

    if (!isValid) {
        throw ('Username or Password are invalid!')
    }
    return user
}

const createToken = async (user) => {
    const { _id, username } = user

    const payload = {
        id: _id,
        username: username
    }

    const token = await jwtSign(payload, process.env.SECRET)
    return token
}

const verifyToken = (token) => jwtVerify(token, process.env.SECRET)

const addToCreatedItems = (userId, itemId) => userModel.findOneAndUpdate({ _id: userId }, { $push: { createdItems: itemId } })

const getUser = (id) => userModel.findById(id).populate('createdItems').lean()

const authServices = {
    registerUser,
    logUser,
    createToken,
    verifyToken,
    addToCreatedItems,
    getUser
}

module.exports = authServices