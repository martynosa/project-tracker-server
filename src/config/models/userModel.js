const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required!'],
    minlength: [4, 'Username with 4 or more characters required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minlength: [6, 'Password with 6 or more characters required!'],
  },
  rePassword: {
    type: String,
    required: [true, 'Repeat Password is required!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and Repeat password must be identical!',
    },
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
});

//hashes the password
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

//validates the password
userSchema.method('validatePassword', function (password) {
  return bcrypt.compare(password, this.password);
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
