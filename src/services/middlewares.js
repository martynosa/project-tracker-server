const authServices = require('./authServices')
const services = require('./services')

//sets the currently logged in user
const auth = async (req, res, next) => {
    const token = req.headers['token']

    if (!token) {
        return next()
    }

    try {
        const decodedToken = await authServices.verifyToken(token)
        console.log(decodedToken)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(500).json(error.message)
    }

}

//blocks non logged users from modifying the created item and returns error code + message
const isGuest = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json('Not logged in!')
    }
    next()
}

//blocks non owners from modifying the created item and returns error code + message
const isOwner = async (req, res, next) => {
    const itemId = req.params.id
    try {
        const item = await services.getSingleItem(itemId)
        if (req.user.id != item.ownerId) {
            return res.status(500).json('Not authorized!')
        }
        next()
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const middlewares = {
    auth,
    isGuest,
    isOwner
}

module.exports = middlewares