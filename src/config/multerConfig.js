const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

// no resizing
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'src/public/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${req.user.email}-${uuidv4()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const resizeProfilePhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.user.email}-${uuidv4()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/public/users/${req.file.filename}`);

  next();
};

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadProfilePhoto = upload.single('photo');

const multerServices = {
  uploadProfilePhoto,
  resizeProfilePhoto,
};

module.exports = multerServices;
