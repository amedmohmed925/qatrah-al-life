const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Route files
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const labRoutes = require('./routes/labRoutes');
const newsRoutes = require('./routes/newsRoutes');
const configRoutes = require('./routes/configRoutes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Security Middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.topbar { display: none; }',
  customSiteTitle: 'Qatrah Al-Life API Documentation',
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/config', configRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Qatrah Al-Life API is running...',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err);
  
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

module.exports = app;
