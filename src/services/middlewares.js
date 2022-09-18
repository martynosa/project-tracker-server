const authServices = require('./authServices');
const itemServices = require('./itemServices');
const AppError = require('./errors/AppError');

//sets the currently logged in user
const auth = async (req, res, next) => {
  const token = req.headers['token'];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = await authServices.verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

//blocks non logged users from acessing data
const isGuest = (req, res, next) => {
  if (!req.user) {
    next(new AppError('Not logged in!', 401));
  }
  next();
};

//blocks non owners from accessing data
const isOwner = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const item = await itemServices.getSingleItem(itemId);
    if (req.user.id !== item.ownerId.toString()) {
      next(new AppError('Not authorized!', 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};

const middlewares = {
  auth,
  isGuest,
  isOwner,
};

module.exports = middlewares;
