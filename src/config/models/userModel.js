const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    validate: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Invalid email address!'],
  },
  name: {
    type: String,
    required: [true, 'Name with 3 or more characters required!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  isDark: {
    type: Boolean,
    default: true,
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
});

//hashes the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.rePassword = undefined;
  next();
});

//validates the password
userSchema.method('validatePassword', async function (password) {
  return await bcrypt.compare(password, this.password);
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
