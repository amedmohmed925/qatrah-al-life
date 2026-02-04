# API Testing Guide - Qatrah Al-Life

Complete guide for testing all API endpoints with example requests and responses.

## 📌 Base URL
```
http://localhost:5000/api
```

## 🔐 Authentication

### 1. Register Admin User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin_user",
  "email": "admin@qatrah-al-life.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login Admin User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@qatrah-al-life.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🏭 Labs Endpoints

### 1. Get All Labs
```http
GET /labs
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439010",
      "type": "organic",
      "title": {
        "ar": "معمل الكيمياء العضوية",
        "en": "Organic Chemistry Lab"
      },
      "description": {
        "ar": "متخصص في تحليل المركبات العضوية",
        "en": "Specialized in organic compound analysis"
      },
      "features": [
        {
          "ar": "معدات حديثة",
          "en": "Modern equipment"
        }
      ],
      "image": "/uploads/lab-organic.jpg",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    },
    {
      "type": "inorganic",
      "title": { "ar": "معمل الكيمياء غير العضوية", "en": "Inorganic Chemistry Lab" },
      "description": { "ar": "...", "en": "..." },
      "features": [],
      "image": "/uploads/lab-inorganic.jpg"
    },
    {
      "type": "microbiology",
      "title": { "ar": "معمل الميكروبيولوجي", "en": "Microbiology Lab" },
      "description": { "ar": "...", "en": "..." },
      "features": [],
      "image": "/uploads/lab-micro.jpg"
    }
  ]
}
```

### 2. Get Lab by Type
```http
GET /labs/organic
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439010",
    "type": "organic",
    "title": {
      "ar": "معمل الكيمياء العضوية",
      "en": "Organic Chemistry Lab"
    },
    "description": { "ar": "...", "en": "..." },
    "features": [],
    "image": "/uploads/lab-organic.jpg",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 3. Update Lab (Admin Only)
```http
PUT /labs/organic
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

title[ar]: "معمل الكيمياء العضوية المحدث"
title[en]: "Updated Organic Chemistry Lab"
description[ar]: "وصف محدث للمعمل..."
description[en]: "Updated lab description..."
features[0][ar]: "معدات حديثة جداً"
features[0][en]: "Very modern equipment"
image: <binary file>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "type": "organic",
    "title": { "ar": "معمل الكيمياء العضوية المحدث", "en": "Updated Organic Chemistry Lab" },
    "description": { "ar": "وصف محدث...", "en": "Updated..." },
    "features": [{ "ar": "معدات حديثة جداً", "en": "Very modern equipment" }],
    "image": "/uploads/image-1707901234000.jpg",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

## 🔧 Services Endpoints

### 1. Get All Services
```http
GET /services
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "slug": "quality-consulting",
      "title": {
        "ar": "استشارات الجودة",
        "en": "Quality Consulting"
      },
      "shortDescription": {
        "ar": "خدمات استشارية متقدمة",
        "en": "Advanced consulting services"
      },
      "fullContent": {
        "ar": "محتوى شامل عن الخدمة...",
        "en": "Comprehensive service content..."
      },
      "category": "consulting",
      "icon": "fas fa-chart-line",
      "image": "/uploads/quality-service.jpg",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### 2. Get Service by Slug
```http
GET /services/quality-consulting
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "slug": "quality-consulting",
    "title": { "ar": "استشارات الجودة", "en": "Quality Consulting" },
    "shortDescription": { "ar": "...", "en": "..." },
    "fullContent": { "ar": "...", "en": "..." },
    "category": "consulting",
    "icon": "fas fa-chart-line",
    "image": "/uploads/quality-service.jpg"
  }
}
```

### 3. Create Service (Admin Only)
```http
POST /services
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": {
    "ar": "استشارات الصيانة",
    "en": "Maintenance Consulting"
  },
  "shortDescription": {
    "ar": "خدمات استشارية للصيانة",
    "en": "Maintenance consultation services"
  },
  "fullContent": {
    "ar": "محتوى كامل عن الصيانة...",
    "en": "Full maintenance content..."
  },
  "category": "maintenance",
  "icon": "fas fa-tools",
  "image": "https://example.com/maintenance.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "slug": "maintenance-consulting",
    "title": { "ar": "استشارات الصيانة", "en": "Maintenance Consulting" },
    "shortDescription": { "ar": "خدمات استشارية للصيانة", "en": "Maintenance consultation services" },
    "fullContent": { "ar": "محتوى كامل...", "en": "Full content..." },
    "category": "maintenance",
    "icon": "fas fa-tools",
    "image": "https://example.com/maintenance.jpg",
    "createdAt": "2024-01-15T11:00:00Z"
  }
}
```

### 4. Update Service (Admin Only)
```http
PUT /services/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": {
    "ar": "استشارات الصيانة المتقدمة",
    "en": "Advanced Maintenance Consulting"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "slug": "advanced-maintenance-consulting",
    "title": { "ar": "استشارات الصيانة المتقدمة", "en": "Advanced Maintenance Consulting" },
    "shortDescription": { "ar": "...", "en": "..." },
    "category": "maintenance"
  }
}
```

### 5. Delete Service (Admin Only)
```http
DELETE /services/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {}
}
```

---

## 🛍️ Products Endpoints

### 1. Get All Products (with Filtering)
```http
GET /products
GET /products?category=chemicals
GET /products?stockStatus=available
GET /products?category=chemicals&stockStatus=available&sort=-price
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": {
        "ar": "كاشف الحموضة",
        "en": "pH Indicator"
      },
      "category": "chemicals",
      "description": {
        "ar": "كاشف دقيق لقياس الحموضة",
        "en": "Precise pH measurement indicator"
      },
      "image": "/uploads/ph-indicator.jpg",
      "stockStatus": "available",
      "price": 45.99,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### 2. Create Product (Admin Only)
```http
POST /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

name[ar]: "أنابيب اختبار زجاجية"
name[en]: "Glass Test Tubes"
category: "lab-tools"
description[ar]: "أنابيب اختبار عالية الجودة"
description[en]: "High-quality test tubes"
price: 15.50
stockStatus: "available"
image: <binary file>
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "name": { "ar": "أنابيب اختبار زجاجية", "en": "Glass Test Tubes" },
    "category": "lab-tools",
    "description": { "ar": "أنابيب اختبار عالية الجودة", "en": "High-quality test tubes" },
    "image": "/uploads/test-tubes-1707901234000.jpg",
    "stockStatus": "available",
    "price": 15.50,
    "createdAt": "2024-01-15T11:00:00Z"
  }
}
```

### 3. Update Product (Admin Only)
```http
PUT /products/507f1f77bcf86cd799439014
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "price": 18.99,
  "stockStatus": "pre_order"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "name": { "ar": "أنابيب اختبار زجاجية", "en": "Glass Test Tubes" },
    "price": 18.99,
    "stockStatus": "pre_order",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

### 4. Delete Product (Admin Only)
```http
DELETE /products/507f1f77bcf86cd799439014
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {}
}
```

---

## 📋 Bookings Endpoints (Core Feature)

### 1. Create Booking (Public - No Auth Required)
This is the main booking system endpoint. Auto-generates ticket number and sends admin email.

```http
POST /bookings
Content-Type: application/json

{
  "clientName": "محمد علي أحمد",
  "organization": "شركة الاستثمار البيئي",
  "phone": "+201001234567",
  "email": "contact@environmental-company.com",
  "requestType": "quality_consultation",
  "details": "نحتاج استشارة حول معايير الجودة الدولية والامتثال التنظيمي",
  "relatedProduct": "507f1f77bcf86cd799439013"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "ticketNumber": "TKT-A7X9K2M5",
    "clientName": "محمد علي أحمد",
    "organization": "شركة الاستثمار البيئي",
    "phone": "+201001234567",
    "email": "contact@environmental-company.com",
    "requestType": "quality_consultation",
    "details": "نحتاج استشارة حول معايير الجودة الدولية والامتثال التنظيمي",
    "relatedProduct": "507f1f77bcf86cd799439013",
    "status": "new",
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

**Email Sent to Admin:**
```
Subject: New Booking Request - TKT-A7X9K2M5

New booking request received!
Ticket Number: TKT-A7X9K2M5
Client Name: محمد علي أحمد
Organization: شركة الاستثمار البيئي
Phone: +201001234567
Email: contact@environmental-company.com
Request Type: quality_consultation
Details: نحتاج استشارة حول معايير الجودة الدولية والامتثال التنظيمي
```

### 2. Get All Bookings (Admin Only)
```http
GET /bookings
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "ticketNumber": "TKT-A7X9K2M5",
      "clientName": "محمد علي أحمد",
      "organization": "شركة الاستثمار البيئي",
      "phone": "+201001234567",
      "email": "contact@environmental-company.com",
      "requestType": "quality_consultation",
      "relatedProduct": {
        "_id": "507f1f77bcf86cd799439013",
        "name": { "ar": "كاشف الحموضة", "en": "pH Indicator" },
        "price": 45.99
      },
      "details": "نحتاج استشارة حول معايير الجودة...",
      "status": "new",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z"
    }
  ]
}
```

### 3. Update Booking Status (Admin Only)
```http
PATCH /bookings/507f1f77bcf86cd799439015/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "in_progress"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "ticketNumber": "TKT-A7X9K2M5",
    "clientName": "محمد علي أحمد",
    "status": "in_progress",
    "updatedAt": "2024-01-15T12:30:00Z"
  }
}
```

Valid status values: `new`, `in_progress`, `completed`, `cancelled`

---

## 📰 News Endpoints

### 1. Get All News (sorted by date, newest first)
```http
GET /news
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "title": {
        "ar": "اعتماد معمل جديد",
        "en": "New Lab Certification"
      },
      "content": {
        "ar": "حصل معملنا على الاعتماد الدولي الجديد...",
        "en": "Our lab received new international certification..."
      },
      "image": "/uploads/news-lab.jpg",
      "date": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### 2. Get Single News Article
```http
GET /news/507f1f77bcf86cd799439016
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "title": { "ar": "اعتماد معمل جديد", "en": "New Lab Certification" },
    "content": { "ar": "...", "en": "..." },
    "image": "/uploads/news-lab.jpg",
    "date": "2024-01-15T10:00:00Z"
  }
}
```

### 3. Create News Article (Admin Only)
```http
POST /news
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

title[ar]: "إطلاق خدمة جديدة"
title[en]: "New Service Launch"
content[ar]: "يسرنا إعلان عن إطلاق خدمة استشارية جديدة..."
content[en]: "We are pleased to announce a new consulting service..."
image: <binary file>
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "title": { "ar": "إطلاق خدمة جديدة", "en": "New Service Launch" },
    "content": { "ar": "يسرنا إعلان...", "en": "We are pleased..." },
    "image": "/uploads/news-service-1707901234000.jpg",
    "date": "2024-01-15T12:00:00Z",
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

### 4. Update News Article (Admin Only)
```http
PUT /news/507f1f77bcf86cd799439017
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

title[ar]: "إطلاق خدمة استشارية جديدة ومميزة"
title[en]: "Exciting New Consulting Service Launch"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "title": { "ar": "إطلاق خدمة استشارية جديدة ومميزة", "en": "Exciting New Consulting Service Launch" },
    "updatedAt": "2024-01-15T12:30:00Z"
  }
}
```

### 5. Delete News Article (Admin Only)
```http
DELETE /news/507f1f77bcf86cd799439017
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {}
}
```

---

## ⚙️ Configuration Endpoints

### 1. Get Site Configuration (Public)
```http
GET /config
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439018",
    "stats": {
      "newProjects": 5,
      "ongoingProjects": 12,
      "finishedProjects": 48,
      "visitors": 1250
    },
    "contactInfo": {
      "phone": "+20123456789",
      "email": "info@qatrah-al-life.com",
      "whatsapp": "+20123456789",
      "address": "Cairo, Egypt"
    },
    "socialLinks": {
      "facebook": "https://facebook.com/qatrahallife",
      "linkedin": "https://linkedin.com/company/qatrahallife",
      "twitter": "https://twitter.com/qatrahallife"
    },
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 2. Update Site Configuration (Admin Only)
```http
PUT /config
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "contactInfo": {
    "phone": "+201234567890",
    "email": "hello@qatrah-al-life.com",
    "whatsapp": "+201234567890",
    "address": "New Cairo, Egypt"
  },
  "socialLinks": {
    "facebook": "https://facebook.com/qatrahallife",
    "linkedin": "https://linkedin.com/company/qatrahallife",
    "twitter": "https://twitter.com/qatrahallife"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "newProjects": 5,
      "ongoingProjects": 12,
      "finishedProjects": 48,
      "visitors": 1250
    },
    "contactInfo": {
      "phone": "+201234567890",
      "email": "hello@qatrah-al-life.com",
      "whatsapp": "+201234567890",
      "address": "New Cairo, Egypt"
    },
    "socialLinks": {
      "facebook": "https://facebook.com/qatrahallife",
      "linkedin": "https://linkedin.com/company/qatrahallife",
      "twitter": "https://twitter.com/qatrahallife"
    },
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

### 3. Update Statistics (Admin Only)
```http
PATCH /config/stats
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "stats": {
    "newProjects": 7,
    "ongoingProjects": 14,
    "finishedProjects": 50
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "newProjects": 7,
      "ongoingProjects": 14,
      "finishedProjects": 50,
      "visitors": 1250
    }
  }
}
```

### 4. Increment Visitor Count (Public)
```http
PATCH /config/visitors
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "newProjects": 7,
      "ongoingProjects": 14,
      "finishedProjects": 50,
      "visitors": 1251
    }
  }
}
```

---

## 🔴 Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "error": "Please add a client name"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "error": "Service not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

---

## 💡 Tips for Testing

1. **Save JWT Token**: After login/register, save the token for subsequent requests
2. **Use Swagger UI**: Visit `/api-docs` for interactive testing
3. **Test File Uploads**: Use Postman or cURL to test multipart/form-data requests
4. **Check Email**: Verify booking emails are sent to admin email address
5. **Monitor Database**: Use MongoDB Compass to verify data persistence

---

**Last Updated**: February 2026
