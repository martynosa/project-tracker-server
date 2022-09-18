const userModel = require('../config/models/userModel');
const util = require('util');
const jwt = require('jsonwebtoken');

const jwtSign = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);

const registerUser = async (userToRegister) => {
  await userModel.create(userToRegister);
};

const logUser = async (userToLog) => {
  const { email, password } = userToLog;
  const user = await userModel.findOne({ email });
  if (!user || !password) {
    throw 'Email or Password are invalid!';
  }
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw 'Email or Password are invalid!';
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

const getUser = (id) => userModel.findById(id).populate('createdItems');

const updateUser = (id, updatedUser) =>
  userModel.findByIdAndUpdate(id, updatedUser, { new: true });

const authServices = {
  registerUser,
  logUser,
  createToken,
  verifyToken,
  getUser,
  updateUser,
};

module.exports = authServices;
