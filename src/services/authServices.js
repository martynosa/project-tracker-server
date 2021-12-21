const userModel = require('../config/models/user-model')
const util = require('util')
const jwt = require('jsonwebtoken')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)
const SECRET = 'E76F271A235932E37DE68AF7E4E3D'

const registerUser = async (userToRegister) => {
    const { username, fullName, password, rePassword } = userToRegister

    if (!username || username.trim() === '' || username.length < 3) {
        throw ('Username must be 3 characters or more!')
    }

    if (!fullName || fullName.trim() === '') {
        throw ('Full Name is required!')
    }

    if (!password || password.trim() === '' || password.length < 5) {
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

    const token = await jwtSign(payload, SECRET)
    return token
}

const verifyToken = (token) => jwtVerify(token, SECRET)

const addToCreatedItems = (userId, itemId) => userModel.findOneAndUpdate({ _id: userId }, { $push: { createdItems: itemId } })

const authServices = {
    registerUser,
    logUser,
    createToken,
    verifyToken,
    addToCreatedItems
}

module.exports = authServices