const userModel = require('../config/models/userModel');
const util = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./errors/AppError');

const jwtSign = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);

const registerUser = async (userToRegister) => {
  await userModel.create(userToRegister);
};

const logUser = async (userToLog) => {
  const { email, password } = userToLog;
  const user = await userModel.findOne({ email });
  if (!user || !password) {
    throw new AppError('Email or Password are invalid!', 401);
  }
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw new AppError('Email or Password are invalid!', 401);
  }
  return user;
};

const createToken = async (user) => {
  const { _id, email } = user;
  const payload = {
    id: _id,
    email: email,
  };
  const token = await jwtSign(payload, process.env.SECRET);
  return token;
};

const verifyToken = (token) => jwtVerify(token, process.env.SECRET);

const getUser = (id) => userModel.findById(id);

const updateUser = (id, updatedUser) =>
  userModel.findByIdAndUpdate(id, updatedUser, { new: true });

const updatePassword = async (id, passwords) => {
  const { password, newPassword, newRePassword } = passwords;
  const user = await userModel.findById(id);
  if (!user) {
    throw new AppError('User is invalid', 404);
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw new AppError('Password is invalid!', 401);
  }

  user.password = newPassword;
  user.rePassword = newRePassword;
  await user.save();
  return { email: user.email, password: newPassword };
};

const authServices = {
  registerUser,
  logUser,
  createToken,
  verifyToken,
  getUser,
  updateUser,
  updatePassword,
};

module.exports = authServices;
