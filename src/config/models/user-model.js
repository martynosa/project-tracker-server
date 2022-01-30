const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    createdItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'item'
        }
    ]
})

//hashes the password
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

//validates the password
userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password)
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel