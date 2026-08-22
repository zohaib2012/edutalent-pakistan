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

const isPdfFile = (file) => {
  if (!file) return false;
  const name = (file.originalname || '').toLowerCase();
  return file.mimetype === 'application/pdf' || name.endsWith('.pdf');
};

// PDFs are uploaded as raw resources so they are delivered even if the
// Cloudinary account's image allowed-formats list does not include "pdf".
const challanStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (isPdfFile(file)) {
      return { folder: 'edutalent/challans', resource_type: 'raw' };
    }
    return {
      folder: 'edutalent/challans',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp'],
      format: (file.mimetype || 'image/png').split('/')[1] || 'png',
    };
  },
});

const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (isPdfFile(file)) {
      return { folder: 'edutalent/documents', resource_type: 'raw' };
    }
    return {
      folder: 'edutalent/documents',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp'],
      format: (file.mimetype || 'image/png').split('/')[1] || 'png',
    };
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
const docUpload = multer({ storage: docStorage, limits: { fileSize: 5 * 1024 * 1024 } });
const questionImageUpload = multer({ storage: questionStorage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { photoUpload, challanUpload, docUpload, questionImageUpload };