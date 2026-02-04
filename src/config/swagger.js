const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Qatrah Al-Life API',
      version: '1.0.0',
      description: 'API documentation for Qatrah Al-Life Environmental Services Laboratory',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: 'https://qatrah-al-life-ays8.vercel.app',
        description: 'Production server',
      },
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../models/*.js')
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
