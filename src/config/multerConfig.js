const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.user.username}-${uuidv4()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadProfilePhoto = upload.single('photo');

module.exports = uploadProfilePhoto;
