const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { configureCloudinary } = require('./config/cloudinary');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

connectDB();
configureCloudinary();

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      /^http:\/\/localhost:\d+$/,
      /^https?:\/\/.*\.vercel\.app$/,
      /^https:\/\/.*\.edutalent.*$/,
    ];
    if (!origin || allowedOrigins.some(r => r.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const routes = require('./routes');
app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduTalent Pakistan API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`EduTalent Pakistan Server running on port ${PORT}`);
  });
}

module.exports = app;
