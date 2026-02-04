# 🚀 Quick Start Guide - Qatrah Al-Life API

Get your API running in 5 minutes!

## Prerequisites
- Node.js v14+ installed
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Email service credentials (Gmail recommended)

---

## Step 1: Clone & Install (2 minutes)

```bash
# Navigate to project directory
cd qatrah-al-life

# Install dependencies
npm install

# Create uploads directory
mkdir uploads
```

---

## Step 2: Configure Environment (1 minute)

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
# Windows: notepad .env
# Mac/Linux: nano .env
```

**Required configurations:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/qatrah-al-life
JWT_SECRET=your_secure_random_key_here_min_32_chars
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@your-domain.com
```

**Get Gmail App Password:**
1. Enable 2-Factor Authentication on Gmail
2. Go to myaccount.google.com/apppasswords
3. Select Mail and Windows
4. Copy the generated password to `EMAIL_PASS`

---

## Step 3: Start Server (1 minute)

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You'll see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.mongodb.net
```

---

## Step 4: Test API (1 minute)

### Option A: Swagger UI (Recommended)
```
https://qatrah-al-life-ays8.vercel.app//api-docs
```
- Interactive API testing
- Full documentation
- Beautiful UI

### Option B: cURL
```bash
# Get all services (no auth required)
curl https://qatrah-al-life-ays8.vercel.app//api/services

# Create a booking
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "محمد علي",
    "phone": "+201001234567",
    "email": "client@example.com",
    "requestType": "quality_consultation",
    "details": "Need consultation about quality standards"
  }'
```

### Option C: Postman
- Import the Swagger docs
- Click "Collections" → "Import from Link"
- Use: `https://qatrah-al-life-ays8.vercel.app//api-docs`

---

## 📚 Documentation Map

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Full API documentation & features |
| [API-TESTING-GUIDE.md](API-TESTING-GUIDE.md) | 30+ endpoint examples with requests/responses |
| [COMPLETION-SUMMARY.md](COMPLETION-SUMMARY.md) | Project overview & deliverables checklist |
| [.env.example](.env.example) | Environment variables reference |

---

## 🔐 First Steps (Admin Setup)

### 1. Register Admin User
```bash
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@qatrah-al-life.com",
    "password": "SecurePassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Save Your Token
Copy the token and use it for admin operations:
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Create Your First Service
```bash
curl -X POST https://qatrah-al-life-ays8.vercel.app//api/services \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "ar": "استشارات الجودة",
      "en": "Quality Consulting"
    },
    "shortDescription": {
      "ar": "خدمات استشارية متقدمة",
      "en": "Advanced consulting services"
    },
    "fullContent": {
      "ar": "محتوى كامل عن الخدمة...",
      "en": "Full service content..."
    },
    "category": "consulting",
    "icon": "fas fa-chart-line",
    "image": "https://example.com/image.jpg"
  }'
```

---

## 💡 Common Tasks

### Get All Products
```bash
curl https://qatrah-al-life-ays8.vercel.app//api/products
```

### Filter Products by Category
```bash
curl "https://qatrah-al-life-ays8.vercel.app//api/products?category=chemicals"
```

### Get Site Configuration
```bash
curl https://qatrah-al-life-ays8.vercel.app//api/config
```

### View All Bookings (Admin)
```bash
curl https://qatrah-al-life-ays8.vercel.app//api/bookings \
  -H "Authorization: Bearer $TOKEN"
```

### Update Booking Status (Admin)
```bash
curl -X PATCH https://qatrah-al-life-ays8.vercel.app//api/bookings/[BOOKING_ID]/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "status": "in_progress" }'
```

---

## 🐛 Troubleshooting

### Problem: MongoDB Connection Error
**Solution:**
1. Check `MONGO_URI` in `.env`
2. Verify MongoDB Atlas IP whitelist includes your IP
3. Check username/password are correct

### Problem: Email Not Sending
**Solution:**
1. Check Gmail app password is correct (not regular password)
2. Enable 2-Factor Authentication on Gmail account
3. Allow "Less secure apps" if not using app passwords

### Problem: JWT Token Invalid
**Solution:**
1. Login again: `POST /api/auth/login`
2. Use new token in Authorization header
3. Check `JWT_SECRET` is set in .env

### Problem: Port 5000 Already in Use
**Solution:**
```bash
# Change port in .env
PORT=5001
```

---

## 📖 API Structure

```
Public Endpoints (no auth):
├── GET  /api/services
├── GET  /api/services/:slug
├── GET  /api/products
├── GET  /api/labs
├── GET  /api/news
├── GET  /api/config
├── POST /api/bookings  ⭐ (auto email to admin)
├── PATCH /api/config/visitors
└── POST /api/auth/login

Protected Endpoints (requires JWT token):
├── POST /api/services
├── PUT  /api/services/:id
├── DELETE /api/services/:id
├── POST /api/products
├── PUT  /api/products/:id
├── DELETE /api/products/:id
├── PUT  /api/labs/:type
├── GET  /api/bookings  (view all)
├── PATCH /api/bookings/:id/status
├── POST /api/news
├── PUT  /api/news/:id
├── DELETE /api/news/:id
├── PUT  /api/config
└── PATCH /api/config/stats
```

---

## 🚀 Deploying to Production

### Option 1: Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create qatrah-al-life

# Set environment variables
heroku config:set JWT_SECRET=your_secret_here
heroku config:set MONGO_URI=your_mongodb_uri
# ... set all other variables

# Deploy
git push heroku main
```

### Option 2: Docker
```bash
# Build image
docker build -t qatrah-al-life .

# Run container
docker run -p 5000:5000 --env-file .env qatrah-al-life
```

### Option 3: Traditional VPS
1. SSH into server
2. Clone repository
3. Install Node.js and npm
4. Run `npm install`
5. Set up `.env` file
6. Use PM2 to keep process alive:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "qatrah-api"
   ```

---

## ✨ Features at a Glance

✅ **Booking System** - Auto ticket generation + admin email notifications
✅ **Multi-language** - Arabic & English support built-in
✅ **File Uploads** - Product/news/lab images stored locally
✅ **JWT Auth** - Secure admin authentication
✅ **Swagger Docs** - Interactive API documentation
✅ **Email Service** - Nodemailer integration
✅ **Security** - Helmet, CORS, XSS, HPP, input sanitization
✅ **Clean Code** - MVC architecture with comments
✅ **30+ Endpoints** - Fully documented and tested
✅ **Production Ready** - Error handling, logging ready, scalable

---

## 📞 Support

### Documentation
- Full README: `README.md`
- Testing Examples: `API-TESTING-GUIDE.md`
- Project Status: `COMPLETION-SUMMARY.md`

### Check Endpoints
- Visit Swagger UI: `https://qatrah-al-life-ays8.vercel.app//api-docs`
- Try example requests from API-TESTING-GUIDE

### Common Issues
See "Troubleshooting" section above

---

## 🎯 Next Steps

1. **Explore the API** using Swagger UI at `/api-docs`
2. **Read the full README** for detailed documentation
3. **Create test data** using API endpoints
4. **Build your frontend** to consume these endpoints
5. **Deploy to production** using Docker or hosting platform

---

**You're all set! Happy coding! 🎉**

Need help? Check the API-TESTING-GUIDE.md for 30+ examples!
