const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { configureCloudinary } = require('./config/cloudinary');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

connectDB();
configureCloudinary();

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
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

const routes = require('./routes');
app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduTalent Pakistan API is running' });
});

app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`EduTalent Pakistan Server running on port ${PORT}`);
  });
}

module.exports = app;
