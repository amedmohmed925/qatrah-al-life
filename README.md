# Qatrah Al-Life - Environmental Services Laboratory API

A production-ready RESTful API built with Node.js, Express, MongoDB, and JWT authentication for managing an environmental services laboratory's online presence, bookings, and e-commerce operations.

## 🎯 Project Overview

This API provides a complete backend solution for:
- **Laboratory Management**: Manage 3 main labs (Organic, Inorganic, Microbiology)
- **Service Management**: Consulting, quality, maintenance, and operational services
- **E-commerce**: Product catalog management (chemicals, lab tools, devices)
- **Booking System**: Client request management with automatic ticket generation and email notifications
- **Admin Dashboard**: Admin authentication, configuration, and content management
- **Multi-language Support**: Full Arabic and English support for all content

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Database**: MongoDB with Mongoose v7.4.0
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer v1.4.5
- **Email Service**: Nodemailer v6.9.4
- **Security**: 
  - Helmet (HTTP headers)
  - CORS (Cross-Origin Resource Sharing)
  - XSS Protection (xss-clean)
  - HPP (HTTP Parameter Pollution)
  - Mongo Sanitization
- **API Documentation**: Swagger/OpenAPI (swagger-jsdoc & swagger-ui-express)
- **Password Hashing**: bcryptjs v2.4.3
- **Slug Generation**: slugify v1.6.6

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB database (local or cloud - MongoDB Atlas recommended)
- Nodemailer-compatible email service (Gmail, SendGrid, etc.)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd qatrah-al-life
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment configuration**
```bash
cp .env.example .env
```

4. **Configure .env file** with your credentials:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/qatrah-al-life
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@qatrah-al-life.com
```

5. **Create uploads directory** (if it doesn't exist)
```bash
mkdir uploads
```

6. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `https://qatrah-al-life-ays8.vercel.app/`
API Documentation: `https://qatrah-al-life-ays8.vercel.app//api-docs`

## 📚 API Documentation

All API endpoints are documented with Swagger/OpenAPI. Access the interactive documentation at `/api-docs` after starting the server.

### Base URL
```
https://qatrah-al-life-ays8.vercel.app//api
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for admin authentication. Protected routes require an Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Public Routes (No Authentication Required)
- `POST /auth/login` - Admin login
- `POST /auth/register` - Admin registration (should be restricted in production)
- `GET /services` - Get all services
- `GET /services/:slug` - Get service by slug
- `GET /products` - Get all products with filtering
- `GET /labs` - Get all labs
- `GET /labs/:type` - Get lab by type
- `GET /news` - Get all news articles
- `GET /config` - Get site configuration
- `POST /bookings` - Create booking request

### Protected Routes (Admin Only - Require JWT)
- `POST /auth/login` - Admin login
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `PUT /labs/:type` - Update lab
- `POST /news` - Create news article
- `PUT /news/:id` - Update news article
- `DELETE /news/:id` - Delete news article
- `GET /bookings` - Get all bookings
- `PATCH /bookings/:id/status` - Update booking status
- `PUT /config` - Update site configuration
- `PATCH /config/stats` - Update statistics

## 📖 API Endpoints

### Authentication
```
POST   /api/auth/register     Register new admin user
POST   /api/auth/login        Login admin user
```

### Services
```
GET    /api/services          Get all services
GET    /api/services/:slug    Get service by slug
POST   /api/services          Create service (Admin)
PUT    /api/services/:id      Update service (Admin)
DELETE /api/services/:id      Delete service (Admin)
```

### Products
```
GET    /api/products          Get all products (supports filtering by category, stockStatus)
POST   /api/products          Create product (Admin)
PUT    /api/products/:id      Update product (Admin)
DELETE /api/products/:id      Delete product (Admin)
```

### Labs
```
GET    /api/labs              Get all labs
GET    /api/labs/:type        Get lab by type (organic, inorganic, microbiology)
PUT    /api/labs/:type        Update lab (Admin)
```

### Bookings (Core Feature)
```
POST   /api/bookings          Create booking request (auto-generates ticket number, sends admin email)
GET    /api/bookings          Get all bookings (Admin)
PATCH  /api/bookings/:id/status  Update booking status (Admin)
```

### News
```
GET    /api/news              Get all news articles (sorted by date)
GET    /api/news/:id          Get single news article
POST   /api/news              Create news article (Admin)
PUT    /api/news/:id          Update news article (Admin)
DELETE /api/news/:id          Delete news article (Admin)
```

### Configuration
```
GET    /api/config            Get site configuration
PUT    /api/config            Update site configuration (Admin)
PATCH  /api/config/stats      Update statistics (Admin)
PATCH  /api/config/visitors   Increment visitor count
```

## 📊 Database Models

### 1. Admin
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (default: 'admin'),
  createdAt: Date
}
```

### 2. GeneralConfig (Singleton)
```javascript
{
  stats: {
    newProjects: Number,
    ongoingProjects: Number,
    finishedProjects: Number,
    visitors: Number
  },
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String,
    address: String
  },
  socialLinks: {
    facebook: String,
    linkedin: String,
    twitter: String
  },
  updatedAt: Date
}
```

### 3. LabPage
```javascript
{
  type: String (enum: ['organic', 'inorganic', 'microbiology'], unique),
  title: { ar: String, en: String },
  description: { ar: String, en: String },
  features: [{ ar: String, en: String }],
  image: String,
  timestamps: true
}
```

### 4. Service
```javascript
{
  slug: String (auto-generated),
  title: { ar: String, en: String },
  shortDescription: { ar: String, en: String },
  fullContent: { ar: String, en: String },
  icon: String,
  image: String,
  category: String (enum: ['consulting', 'quality', 'maintenance', 'operation']),
  timestamps: true
}
```

### 5. Product
```javascript
{
  name: { ar: String, en: String },
  category: String (enum: ['chemicals', 'lab-tools', 'devices']),
  description: { ar: String, en: String },
  image: String,
  stockStatus: String (enum: ['available', 'out_of_stock', 'pre_order']),
  price: Number,
  timestamps: true
}
```

### 6. Booking (Core Feature)
```javascript
{
  ticketNumber: String (auto-generated unique ID, e.g., 'TKT-ABC123XYZ'),
  clientName: String (required),
  organization: String,
  phone: String (required),
  email: String (required, validated),
  requestType: String (enum: ['consultation_booking', 'sample_collection', 'quality_consultation', 'maintenance_support', 'chemical_supply']),
  relatedProduct: ObjectId (ref: Product),
  details: String,
  status: String (enum: ['new', 'in_progress', 'completed', 'cancelled'], default: 'new'),
  timestamps: true
}
```

### 7. News
```javascript
{
  title: { ar: String, en: String },
  content: { ar: String, en: String },
  image: String,
  date: Date (default: now),
  timestamps: true
}
```

## 🎯 Key Features

### 1. Booking System (Core Logic)
- **Automatic Ticket Generation**: Each booking gets a unique ticket number (TKT-XXXXXXXXX)
- **Email Notifications**: Admin receives email notification when new booking is created
- **Status Tracking**: Bookings can be tracked through lifecycle: new → in_progress → completed/cancelled
- **Product Linking**: Bookings can be linked to specific products

### 2. File Upload Management
- **Multer Integration**: Handles image uploads for products, news, and labs
- **Storage**: Files stored in `/uploads` directory
- **File Validation**: Only JPEG, JPG, PNG files allowed
- **URL Generation**: Uploaded files accessible via `/uploads/filename`

### 3. Multi-language Support
- **Arabic & English**: All content models support both languages
- **Flexible Structure**: Title, description, and other text fields contain both { ar, en }

### 4. Security Features
- **Password Hashing**: All passwords hashed with bcryptjs
- **JWT Authentication**: Secure token-based admin authentication
- **Input Sanitization**: Protection against NoSQL injection and XSS attacks
- **CORS**: Configured for cross-origin requests
- **Helmet**: HTTP headers security
- **HPP**: HTTP Parameter Pollution protection

### 5. Email Service
- **Nodemailer Integration**: Supports multiple email providers
- **Template Support**: Flexible email message formatting
- **Admin Notifications**: Automatic notifications for new bookings
- **Error Handling**: Graceful error handling if email fails

## 📁 Project Structure

```
qatrah-al-life/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── swagger.js         # Swagger/OpenAPI configuration
│   ├── models/
│   │   ├── Admin.js           # Admin schema with password hashing & JWT
│   │   ├── Booking.js         # Booking schema with auto ticket generation
│   │   ├── GeneralConfig.js   # Site configuration (singleton)
│   │   ├── LabPage.js         # Lab pages schema
│   │   ├── News.js            # News articles schema
│   │   ├── Product.js         # Products schema
│   │   └── Service.js         # Services schema with slug generation
│   ├── controllers/
│   │   ├── authController.js      # Login & registration logic
│   │   ├── bookingController.js   # Booking management & email logic
│   │   ├── configController.js    # Site config management
│   │   ├── labController.js       # Lab pages management
│   │   ├── newsController.js      # News management
│   │   ├── productController.js   # Product management
│   │   └── serviceController.js   # Service management
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── bookingRoutes.js   # Booking endpoints
│   │   ├── configRoutes.js    # Config endpoints
│   │   ├── labRoutes.js       # Lab endpoints
│   │   ├── newsRoutes.js      # News endpoints
│   │   ├── productRoutes.js   # Product endpoints
│   │   └── serviceRoutes.js   # Service endpoints
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   └── upload.js          # Multer file upload middleware
│   ├── utils/
│   │   └── sendEmail.js       # Email sending utility
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── uploads/                   # Directory for uploaded files
├── package.json               # Project dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🔄 Workflow Examples

### Example 1: Admin Login and Create a Service

```bash
# 1. Login
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Response includes JWT token
# {
#   "success": true,
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }

# 2. Create Service (use token from login)
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": {
      "ar": "استشارات الجودة",
      "en": "Quality Consulting"
    },
    "shortDescription": {
      "ar": "خدمات استشارية في مجال ضمان الجودة",
      "en": "Consulting services for quality assurance"
    },
    "fullContent": {
      "ar": "محتوى كامل عن خدمة الاستشارات...",
      "en": "Full content about consulting service..."
    },
    "category": "consulting",
    "icon": "fas fa-chart-line",
    "image": "https://example.com/image.jpg"
  }'
```

### Example 2: Client Creates a Booking Request

```bash
# Public endpoint - no authentication needed
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "أحمد محمد",
    "organization": "شركة البيئة النقية",
    "phone": "+201001234567",
    "email": "contact@company.com",
    "requestType": "quality_consultation",
    "details": "نحتاج استشارة حول معايير الجودة الدولية",
    "relatedProduct": "507f1f77bcf86cd799439011"
  }'

# Response includes auto-generated ticket number
# {
#   "success": true,
#   "data": {
#     "ticketNumber": "TKT-ABC123XYZ",
#     "clientName": "أحمد محمد",
#     "status": "new",
#     "createdAt": "2024-01-15T10:30:00Z"
#   }
# }
# Admin receives email notification
```

### Example 3: Admin Updates Booking Status

```bash
curl -X PATCH https://qatrah-al-life-ays8.vercel.app//api/bookings/507f1f77bcf86cd799439012/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -d '{
    "status": "in_progress"
  }'
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development, production |
| `MONGO_URI` | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| `JWT_SECRET` | JWT signing key | your_secret_key_here |
| `JWT_EXPIRE` | JWT expiration | 30d |
| `EMAIL_HOST` | Email server host | smtp.gmail.com |
| `EMAIL_PORT` | Email server port | 587 |
| `EMAIL_USER` | Email account | your_email@gmail.com |
| `EMAIL_PASS` | Email password/token | app_password |
| `EMAIL_FROM` | Sender address | Qatrah Al-Life <noreply@...> |
| `ADMIN_EMAIL` | Admin email for notifications | admin@company.com |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🧪 Testing the API

### Using cURL
```bash
# Get all services
curl https://qatrah-al-life-ays8.vercel.app//api/services

# Get specific lab
curl https://qatrah-al-life-ays8.vercel.app//api/labs/organic

# Get products with filtering
curl "https://qatrah-al-life-ays8.vercel.app//api/products?category=chemicals"

# Get all news (sorted by date)
curl https://qatrah-al-life-ays8.vercel.app//api/news
```

### Using Postman
1. Import the Swagger documentation from `/api-docs`
2. Use the interactive Swagger UI to test all endpoints
3. Store JWT token in environment variable after login
4. Use `{{token}}` in authorization headers for protected routes

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` file, use `.env.example`
2. **JWT Secret**: Use a strong, random secret in production (min 32 characters)
3. **Password Policy**: Enforce strong passwords (done via bcryptjs)
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure specific domains instead of "*" in production
6. **Rate Limiting**: Consider adding rate limiting middleware for production
7. **Input Validation**: Always validate and sanitize user inputs
8. **Email Security**: Use environment-specific credentials

## 🚀 Deployment Guide

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t qatrah-al-life .
docker run -p 5000:5000 --env-file .env qatrah-al-life
```

### Heroku Deployment
```bash
heroku login
heroku create qatrah-al-life
heroku config:set JWT_SECRET=your_secret_here
git push heroku main
```

## 📞 Support & Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check `MONGO_URI` in `.env`
- Ensure MongoDB Atlas IP whitelist includes your server

**Email Not Sending**
- Verify SMTP credentials
- For Gmail, use App Password (not regular password)
- Check firewall allows SMTP port 587

**JWT Token Expired**
- Get new token by logging in again
- Increase JWT_EXPIRE if needed

**Multer Upload Failing**
- Ensure `/uploads` directory exists and is writable
- Check file size and format restrictions
- Verify disk space availability

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Swagger/OpenAPI Specification](https://swagger.io/)
- [Nodemailer Documentation](https://nodemailer.com/)

## 📄 License

This project is proprietary software owned by Qatrah Al-Life. All rights reserved.

## 👥 Contributors

- Development Team: Qatrah Al-Life Technical Team

---

**Last Updated**: February 2026
**API Version**: 1.0.0
**Status**: Production Ready ✅
