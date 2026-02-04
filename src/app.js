const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const ensureDbConnection = require('./middleware/dbMiddleware');

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

// Serve Swagger UI assets and JSON using swagger-ui-dist to ensure correct MIME types
const fs = require('fs');
const swaggerUiDist = require('swagger-ui-dist');
const swaggerAssetPath = (swaggerUiDist.getAbsoluteFSPath && swaggerUiDist.getAbsoluteFSPath()) || swaggerUiDist.absolutePath();

// Serve static swagger assets (css/js) with correct content-types
app.use('/api-docs', express.static(swaggerAssetPath));

// Swagger JSON endpoint
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// Serve a simple HTML that bootstraps Swagger UI and points to our swagger.json
app.get('/api-docs', (req, res) => {
  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Qatrah Al-Life API Docs</title>
    <link rel="stylesheet" type="text/css" href="/api-docs/swagger-ui.css" />
    <style>
      body { margin:0; padding:0; }
      .topbar { display: none; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="/api-docs/swagger-ui-bundle.js"></script>
    <script src="/api-docs/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function() {
        const ui = SwaggerUIBundle({
          url: '/api-docs/swagger.json',
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: 'BaseLayout'
        });
        window.ui = ui;
      };
    </script>
  </body>
  </html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Database connection middleware for all API routes
app.use('/api', ensureDbConnection);

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
