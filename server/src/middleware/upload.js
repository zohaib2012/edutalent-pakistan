const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const photoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edutalent/photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp'],
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
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp', 'pdf'],
  },
});

const questionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edutalent/questions',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'bmp'],
  },
});

const photoUpload = multer({ storage: photoStorage, limits: { fileSize: 2 * 1024 * 1024 } });
const challanUpload = multer({ storage: challanStorage, limits: { fileSize: 5 * 1024 * 1024 } });
const docUpload = multer({ storage: docStorage, limits: { fileSize: 2 * 1024 * 1024 } });
const questionImageUpload = multer({ storage: questionStorage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { photoUpload, challanUpload, docUpload, questionImageUpload };