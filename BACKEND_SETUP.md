# 🛡️ RT NEWS - Production-Ready Security Implementation

## ✅ What We've Implemented

### 1. **Backend Security Layer (Express.js)**
- ✅ Secure authentication with JWT tokens
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Rate limiting on login (5 attempts per 15 minutes)
- ✅ CORS protection with configurable origins
- ✅ Security headers via Helmet.js
- ✅ File upload validation (mime type checking)
- ✅ Input validation and length limits
- ✅ NoIndex meta tags on admin pages
- ✅ robots.txt rules to hide admin routes

### 2. **Architecture**
```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                      │
│         • AdminLogin component (JWT-based)              │
│         • Admin CRUD panel with file uploads            │
│         • Real-time search & filtering                  │
│         • Theme/Language toggle                         │
└────────────────┬────────────────────────────────────────┘
                 │
          API Calls (HTTP)
                 │
┌────────────────▼────────────────────────────────────────┐
│            BACKEND (Express.js) - Port 5000             │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │        JWT Authentication Middleware             │  │
│  │  • Verify tokens on protected routes             │  │
│  │  • 24-hour token expiration                      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Rate Limiting (Login)                    │  │
│  │  • 5 attempts per 15 minutes per IP              │  │
│  │  • Prevents brute force attacks                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Password Security                        │  │
│  │  • bcryptjs with 10 salt rounds                  │  │
│  │  • Passwords never stored in plaintext           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         File Upload Handler                      │  │
│  │  • Validates MIME types                          │  │
│  │  • Max file size: 50MB                           │  │
│  │  • Stores in /uploads directory                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Data Storage                             │  │
│  │  • JSON file-based (data.json)                   │  │
│  │  • Can migrate to MongoDB/PostgreSQL later       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Security Features

### JWT Authentication Flow
```
1. User enters username/password
2. Backend verifies credentials against bcrypt hash
3. If valid: JWT token generated with 24h expiration
4. Token stored in localStorage on frontend
5. Subsequent requests include: Authorization: Bearer {token}
6. Backend middleware verifies token before processing request
7. If expired/invalid: 401 Unauthorized response
```

### File Upload Security
```
1. File selected by user in admin panel
2. Sent to backend via multipart/form-data
3. Backend checks: MIME type whitelist
4. Size check: max 50MB
5. File stored in /uploads/ with unique name
6. Reference saved in data.json
7. No direct file path exposure to client
```

### Rate Limiting for Brute Force Protection
```
Each IP address gets:
- 5 login attempts
- Per 15-minute window
- After 5 attempts: 429 "Too Many Requests" response
- Timer resets after 15 minutes
```

---

## 📋 API Endpoints

### Public Endpoints (No Auth Required)
```
GET /api/health
  → Response: { "status": "ok", "timestamp": "..." }

POST /api/auth/login (RATE LIMITED)
  → Body: { "username": "admin", "password": "..." }
  → Response: { "success": true, "token": "jwt...", "user": {...} }

GET /api/articles
  → Response: [ { article objects } ]

GET /api/articles/:id
  → Response: { article object }

GET /uploads/:filename
  → Response: File stream (image/video)
```

### Protected Endpoints (Requires JWT Token)
```
POST /api/articles
  → Headers: Authorization: Bearer {token}
  → Body: FormData with title, excerpt, content, category, author, image, video, isHero, isBreaking
  → Response: { created article object }

PUT /api/articles/:id
  → Headers: Authorization: Bearer {token}
  → Body: FormData with updated fields
  → Response: { updated article object }

DELETE /api/articles/:id
  → Headers: Authorization: Bearer {token}
  → Response: { "success": true, "deleted": { article object } }
```

---

## 🚀 Local Development (With Backend)

### Terminal 1: Start Backend
```bash
npm run server
# Backend runs on http://localhost:5000
# Logs show: "🚀 RT NEWS Backend running on http://localhost:5000"
```

### Terminal 2: Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:5174
```

### Both at Once (Single Terminal)
```bash
npm run dev:all
# Runs both servers concurrently with proper logging
```

### Test the Setup
```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"rtnews@123"}'

# Copy the returned token, then:

# 2. Create Article
curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer {paste_token_here}" \
  -F "title=Breaking News" \
  -F "excerpt=This is a test article" \
  -F "content=Full content here" \
  -F "category=World" \
  -F "author=Admin"

# 3. Get All Articles
curl http://localhost:5000/api/articles

# 4. Navigate to http://localhost:5174/ and test admin panel
```

---

## 🔐 Before Production Deployment

### 1. Change Default Admin Password
Edit `server.js` line ~35:
```javascript
{
  id: '1',
  username: 'admin',
  password: bcrypt.hashSync('YOUR_NEW_STRONG_PASSWORD_HERE', 10),
  // ...
}
```

### 2. Update Environment Variables
`.env` file:
```
PORT=5000
JWT_SECRET=generate_a_long_random_string_using_https://generate-random.org
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
```

To generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Database Options for Production

#### Option A: Keep JSON (Simple, Suitable for <10K articles)
- No migration needed
- Regular backups: `cp data.json data.json.backup`
- Backup to: AWS S3, Dropbox, or GitHub

#### Option B: Migrate to MongoDB (Recommended)
```bash
npm install mongoose
# Update server.js to use Mongoose schemas
# Add MongoDB connection string to .env
# Migrate data.json to MongoDB collection
```

#### Option C: Migrate to PostgreSQL (Enterprise)
```bash
npm install pg sequelize
# Setup PostgreSQL connection
# Create migrations for articles table
```

---

## 📦 Deployment Steps

### Deploy to Render.com (Recommended - FREE)

#### Step 1: Connect GitHub
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub account and select ART-NEWS repository

#### Step 2: Configure Deploy Settings
```
Name: rt-news-backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

#### Step 3: Add Environment Variables
Dashboard → Environment:
```
PORT=5000
JWT_SECRET=your_generated_secret_key
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
NODE_ENV=production
```

#### Step 4: Deploy Frontend to Vercel
1. Go to https://vercel.com/dashboard
2. Import GitHub project
3. Add environment variable: `VITE_API_URL=https://rt-news-backend.onrender.com`
4. Deploy!

#### Step 5: Update Frontend CORS
After Vercel deployment, update Render backend:
```
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

---

## 🔍 Security Checklist (Pre-Production)

- [ ] Changed admin password from default (`rtnews@123`)
- [ ] Generated strong JWT_SECRET and added to .env
- [ ] Set NODE_ENV=production
- [ ] Verified CORS_ORIGIN points to your domain
- [ ] Removed console logs that expose secrets
- [ ] Tested rate limiting (5 failed logins should block access)
- [ ] Verified robots.txt blocks /admin routes
- [ ] Tested file upload with valid and invalid file types
- [ ] Confirmed token expiration works (24 hours)
- [ ] Set up regular backups (data.json)
- [ ] Verified HTTPS is enabled on both frontend and backend
- [ ] Tested login from production domain
- [ ] Checked that admin panel is not indexed by search engines
- [ ] Reviewed error messages (don't expose sensitive info)

---

## 📊 Monitoring & Logs

### View Backend Logs (Local Development)
```
npm run server
# Shows all requests, errors, authentication events
```

### View Deployment Logs (Render)
Dashboard → Services → rt-news-backend → Logs

### Monitor Failed Logins
Look for "Invalid credentials" or "Too many login attempts" messages

---

## 🆘 Troubleshooting

### Backend not connecting
```
Error: Cannot connect to http://localhost:5000
Fix: Check if `npm run server` is running in another terminal
```

### Login fails with "Connection error"
```
Error: "Connection error. Make sure backend is running on port 5000"
Fix: Ensure backend server is started and .env has correct API_URL
```

### Rate limiting too strict
Edit `server.js` line ~55:
```javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // Change this (in milliseconds)
  max: 5,                     // Or this (number of attempts)
  // ...
});
```

### Token expiration too short
Edit `server.js` line ~135:
```javascript
jwt.sign(
  { id, username, role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }  // Change this value
);
```

### Files not uploading
```
Check: 
1. File size < 50MB
2. File type is in allowed list (image/*, video/mp4, etc.)
3. /uploads/ directory exists
4. Backend has write permissions
```

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start backend | `npm run server` |
| Start frontend | `npm run dev` |
| Start both | `npm run dev:all` |
| Build for production | `npm run build` |
| Generate JWT_SECRET | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| View backend logs | Check terminal where `npm run server` runs |
| Reset database | Delete `data.json`, server will recreate it |
| Change admin password | Edit `server.js` and restart backend |

---

## 🎯 Next Steps for Full Production

1. ✅ **Security Layer**: Completed (you are here)
2. ⏳ **Database Migration**: Move from JSON to MongoDB/PostgreSQL
3. ⏳ **User Management**: Add role-based access control (Admin, Editor, Viewer)
4. ⏳ **Email System**: Send password reset emails via Nodemailer
5. ⏳ **Analytics**: Track article views, user engagement
6. ⏳ **CDN**: Serve images via CloudFront or Cloudflare
7. ⏳ **Backups**: Automated daily backups to AWS S3
8. ⏳ **Monitoring**: Error tracking with Sentry, uptime monitoring

---

**Your website is now ready for secure deployment and sale! 🎉**
