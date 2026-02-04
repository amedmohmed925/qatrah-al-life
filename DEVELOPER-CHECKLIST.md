# 📋 Developer Checklist - Qatrah Al-Life API

Complete checklist for developers integrating this API.

---

## ✅ Setup Checklist

- [ ] Clone/download repository
- [ ] Run `npm install` to install dependencies
- [ ] Copy `.env.example` to `.env`
- [ ] Update `.env` with:
  - [ ] MongoDB URI (MongoDB Atlas)
  - [ ] JWT_SECRET (random 32+ character string)
  - [ ] Email credentials (Gmail app password)
  - [ ] Admin email address
  - [ ] Frontend URL for CORS
- [ ] Create `/uploads` directory
- [ ] Verify MongoDB connection works
- [ ] Test email service works
- [ ] Start development server: `npm run dev`
- [ ] Access Swagger docs: `http://localhost:5000/api-docs`

---

## ✅ Initial Admin Setup

- [ ] Register admin user via `/api/auth/register`
- [ ] Save JWT token securely
- [ ] Create initial services (at least 1)
- [ ] Create initial products (at least 1)
- [ ] Update lab pages with descriptions
- [ ] Update site configuration via `/api/config`
- [ ] Add contact info and social links
- [ ] Upload lab images
- [ ] Create welcome news article
- [ ] Verify admin token still works

---

## ✅ Testing All Endpoints

### Public Endpoints (No Auth)
- [ ] GET `/api/services` - Returns list of services
- [ ] GET `/api/services/:slug` - Returns single service
- [ ] GET `/api/products` - Returns list of products
- [ ] GET `/api/products?category=chemicals` - Filtering works
- [ ] GET `/api/labs` - Returns all 3 labs
- [ ] GET `/api/labs/organic` - Returns specific lab
- [ ] GET `/api/news` - Returns news sorted by date
- [ ] GET `/api/config` - Returns site configuration
- [ ] POST `/api/bookings` - Creates booking and sends email
- [ ] PATCH `/api/config/visitors` - Increments visitor count

### Admin Endpoints (Requires Auth)
- [ ] POST `/api/auth/login` - Login returns token
- [ ] POST `/api/services` - Create service
- [ ] PUT `/api/services/:id` - Update service
- [ ] DELETE `/api/services/:id` - Delete service
- [ ] POST `/api/products` - Create product with image
- [ ] PUT `/api/products/:id` - Update product
- [ ] DELETE `/api/products/:id` - Delete product
- [ ] PUT `/api/labs/:type` - Update lab with image
- [ ] POST `/api/news` - Create news with image
- [ ] PUT `/api/news/:id` - Update news
- [ ] DELETE `/api/news/:id` - Delete news
- [ ] GET `/api/bookings` - View all bookings
- [ ] PATCH `/api/bookings/:id/status` - Update booking status
- [ ] PUT `/api/config` - Update configuration
- [ ] PATCH `/api/config/stats` - Update statistics

---

## ✅ Data Validation Checklist

### Booking Validation
- [ ] Email format is validated
- [ ] Required fields are enforced
- [ ] Ticket number is auto-generated
- [ ] Status defaults to 'new'
- [ ] Admin email is sent on creation

### Product Validation
- [ ] Category is one of: chemicals, lab-tools, devices
- [ ] Stock status is one of: available, out_of_stock, pre_order
- [ ] Price is a valid number
- [ ] Image upload works and stores file

### Service Validation
- [ ] Slug is auto-generated from English title
- [ ] Category is one of: consulting, quality, maintenance, operation
- [ ] Bilingual content is required (ar, en)

### Lab Validation
- [ ] Type is unique (only one of each: organic, inorganic, microbiology)
- [ ] Bilingual content required
- [ ] Features array supports multi-language items

### News Validation
- [ ] Bilingual title and content required
- [ ] Date defaults to now if not provided
- [ ] Image upload optional but stores correctly

---

## ✅ Security Checklist

- [ ] JWT tokens expire after 30 days
- [ ] Passwords are hashed with bcryptjs
- [ ] Admin routes require valid JWT token
- [ ] CORS is enabled only for specified domains
- [ ] Helmet security headers are applied
- [ ] XSS protection is active
- [ ] HPP protection is active
- [ ] NoSQL injection protection is active
- [ ] File uploads only accept JPEG/JPG/PNG
- [ ] Sensitive data not logged or exposed
- [ ] .env file is in .gitignore
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] EMAIL credentials use app passwords not real passwords

---

## ✅ File Upload Testing

- [ ] Upload product image via POST /api/products
- [ ] Upload lab image via PUT /api/labs/:type
- [ ] Upload news image via POST /api/news
- [ ] Verify images accessible via /uploads/filename
- [ ] Test file type validation (reject non-image files)
- [ ] Verify filenames are unique with timestamps
- [ ] Check upload directory permissions

---

## ✅ Email Testing

- [ ] Test booking creation sends email to admin
- [ ] Email contains all booking details
- [ ] Email contains ticket number
- [ ] Email formatting is readable
- [ ] Email subject line is clear
- [ ] Verify Gmail app password is being used
- [ ] Test with alternative email providers (SendGrid, etc.)

---

## ✅ Error Handling

- [ ] 400: Bad Request returns meaningful error
- [ ] 401: Unauthorized when no/invalid token
- [ ] 404: Not Found returns correct message
- [ ] 500: Server errors are logged
- [ ] Validation errors are descriptive
- [ ] Missing required fields show field name
- [ ] Invalid email format shows email error
- [ ] Duplicate unique values show appropriate error

---

## ✅ Database Checklist

- [ ] MongoDB connection is verified
- [ ] All indexes are created (unique constraints)
- [ ] Timestamps work on all models
- [ ] Relationships work (Booking references Product)
- [ ] Populate works (Bookings include product details)
- [ ] Sorting works on news by date
- [ ] Filtering works on products
- [ ] Auto-increment ticket numbers are unique

---

## ✅ Frontend Integration Points

- [ ] Frontend can login and get JWT token
- [ ] Frontend stores token in localStorage or cookie
- [ ] Frontend includes token in Authorization header
- [ ] Frontend handles 401 unauthorized response
- [ ] Frontend displays products from /api/products
- [ ] Frontend displays services from /api/services
- [ ] Frontend displays news from /api/news
- [ ] Frontend submits booking form to /api/bookings
- [ ] Frontend displays confirmation with ticket number
- [ ] Admin dashboard displays bookings from /api/bookings
- [ ] Admin can update booking status
- [ ] Admin can create/edit/delete content

---

## ✅ Documentation Review

- [ ] README.md is complete and accurate
- [ ] API-TESTING-GUIDE.md has 30+ examples
- [ ] QUICK-START.md provides setup guidance
- [ ] COMPLETION-SUMMARY.md lists all deliverables
- [ ] All endpoints are documented in Swagger
- [ ] JSDoc comments are present in code
- [ ] .env.example has all required variables
- [ ] Inline code comments are clear

---

## ✅ Performance Checklist

- [ ] Database indexes are created
- [ ] Queries are optimized
- [ ] No N+1 query problems
- [ ] Pagination is implemented (if needed)
- [ ] Response times are acceptable
- [ ] Memory usage is stable
- [ ] File upload sizes are limited
- [ ] Error logs don't cause performance issues

---

## ✅ Deployment Checklist

- [ ] NODE_ENV is set to 'production'
- [ ] JWT_SECRET is strong and random
- [ ] MONGO_URI points to production database
- [ ] Email credentials are for production account
- [ ] CORS whitelist includes production domain
- [ ] Uploads directory is writable on server
- [ ] Environment variables are set on host
- [ ] SSL certificate is configured (HTTPS)
- [ ] Rate limiting is configured
- [ ] Logging is properly configured
- [ ] Database backups are scheduled
- [ ] Email backups/logs are monitored
- [ ] Error monitoring is set up (Sentry, LogRocket, etc.)
- [ ] API monitoring is configured

---

## ✅ Post-Deployment Checklist

- [ ] API is accessible from production URL
- [ ] Swagger docs work at /api-docs
- [ ] All endpoints respond correctly
- [ ] Bookings send emails to correct address
- [ ] File uploads work and are persistent
- [ ] Database data is persistent across restarts
- [ ] Error logs are being collected
- [ ] Performance is acceptable
- [ ] Security headers are present
- [ ] CORS works for frontend domain
- [ ] SSL certificate is valid
- [ ] Backups are working
- [ ] Monitoring alerts are configured
- [ ] Team has access to logs and monitoring

---

## ✅ Maintenance Checklist (Monthly)

- [ ] Check for security updates in npm packages
- [ ] Review error logs for patterns
- [ ] Check database performance
- [ ] Review backup status
- [ ] Check API response times
- [ ] Verify email delivery
- [ ] Review file upload storage
- [ ] Check for unused code or dependencies
- [ ] Review access logs for anomalies
- [ ] Update documentation if needed

---

## ✅ Scaling Checklist (When Needed)

- [ ] Add database replication
- [ ] Implement caching layer (Redis)
- [ ] Set up load balancing
- [ ] Optimize database indexes
- [ ] Implement rate limiting
- [ ] Add CDN for static assets
- [ ] Horizontal scaling setup
- [ ] Database sharding if needed

---

## 📞 Helpful Commands

```bash
# Check if server is running
curl http://localhost:5000

# Get API docs
curl http://localhost:5000/api-docs

# Check logs (if using PM2)
pm2 logs qatrah-api

# Restart server
pm2 restart qatrah-api

# View all processes
pm2 list

# Stop server
pm2 stop qatrah-api

# Test database connection
npm run test:db

# Generate new JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🆘 Emergency Contacts

- Database Down: Check MongoDB Atlas status, verify connection string
- Email Not Working: Verify Gmail app password, check SMTP settings
- API Down: Check logs with `pm2 logs`, verify disk space
- High Error Rate: Check logs, monitor database, review recent changes

---

## 📚 Key File Locations

| Function | File |
|----------|------|
| Database Connection | `src/config/db.js` |
| API Documentation | `src/config/swagger.js` |
| Express Setup | `src/app.js` |
| Server Entry | `src/server.js` |
| Auth Logic | `src/controllers/authController.js` |
| Booking Logic | `src/controllers/bookingController.js` |
| Email Logic | `src/utils/sendEmail.js` |
| Auth Middleware | `src/middleware/auth.js` |
| File Upload | `src/middleware/upload.js` |
| Configuration | `.env` |

---

## ✨ Quality Assurance

- [ ] Code passes linting (if configured)
- [ ] All tests pass (if tests exist)
- [ ] Documentation is current
- [ ] Security review passed
- [ ] Performance testing done
- [ ] Load testing done
- [ ] User acceptance testing done
- [ ] Production readiness review done

---

**Print this checklist and work through it systematically!**

**Status: Ready for Production ✅**

Last Updated: February 2026
