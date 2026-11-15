
require('dotenv').config();

const express = require('express');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Task Routes
app.use('/api/tasks', taskRoutes);

// Ana endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OrbitOps API is running',
    environment: config.nodeEnv,
  });
});

// 404 yönetimi
app.use(notFound);

// Merkezi hata yönetimi
app.use(errorHandler);

module.exports = app;
