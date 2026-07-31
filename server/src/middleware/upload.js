const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const photoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edutalent/photos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }],
  },
});

const challanStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edutalent/challans',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edutalent/documents',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

const photoUpload = multer({ storage: photoStorage, limits: { fileSize: 2 * 1024 * 1024 } });
const challanUpload = multer({ storage: challanStorage, limits: { fileSize: 5 * 1024 * 1024 } });
const docUpload = multer({ storage: docStorage, limits: { fileSize: 2 * 1024 * 1024 } });

module.exports = { photoUpload, challanUpload, docUpload };