# 🔒 RT NEWS - Production Security Setup Guide

## Backend Security Features Implemented

### ✅ Authentication & Authorization
- **JWT Token-based Authentication**: Secure token generation and validation
- **Password Hashing**: Bcryptjs for secure password storage (salted hashing)
- **Rate Limiting**: 5 login attempts per 15 minutes (prevents brute force attacks)
- **Token Expiration**: Tokens expire in 24 hours

### ✅ Data Protection
- **Input Validation**: All user inputs validated and length-limited
- **CORS Protection**: Only allow requests from your frontend domain
- **Helmet.js**: Security headers (X-Frame-Options, Content-Security-Policy, etc.)
- **File Upload Validation**: Only allows specific MIME types (images & videos)

### ✅ API Security
- **Protected Endpoints**: Article CRUD endpoints require valid JWT token
- **NoIndex Meta Tags**: Admin pages hidden from search engines
- **robots.txt**: `/admin` routes blocked from crawlers
- **Secure FormData**: Files uploaded properly with multipart/form-data

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
JWT_SECRET=your_super_secret_key_change_this_in_production
CORS_ORIGIN=http://localhost:5174
NODE_ENV=development
```

⚠️ **IMPORTANT**: Change `JWT_SECRET` to a long random string in production!

### 3. Start Both Servers
```bash
npm run dev:all
```

This runs:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5174`

---

## 🌐 Production Deployment

### Option 1: Deploy to Render.com (Recommended - FREE)

#### Step 1: Prepare for Production
```bash
# Build frontend
npm run build

# Create .env.production
PORT=5000
JWT_SECRET=generate_a_long_random_string_here
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
```

#### Step 2: Create Backend on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in details:
   - **Name**: `rt-news-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add environment variables from `.env.production`
6. Deploy! 🚀

#### Step 3: Deploy Frontend to Vercel (Also FREE)
1. Go to https://vercel.com
2. Import your GitHub project
3. Add environment variable:
   - `VITE_API_URL=https://your-render-backend.onrender.com`
4. Deploy! 🚀

### Option 2: Deploy Together on Heroku

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Git push to Heroku
git push heroku main
```

---

## 🔐 Security Checklist Before Selling

- [ ] Change `JWT_SECRET` in production `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Set correct `CORS_ORIGIN` (your domain, not localhost)
- [ ] Enable HTTPS (automatic on Render/Vercel)
- [ ] Use strong database password if migrating to MongoDB/PostgreSQL
- [ ] Regular backups of `data.json`
- [ ] Monitor admin login attempts (check logs)
- [ ] Update npm packages regularly: `npm audit fix`
- [ ] Hide `data.json` and `.env` from git (already in .gitignore)
- [ ] Enable 2FA on GitHub account

---

## 📊 Default Admin Credentials

**Username**: `admin`  
**Password**: `rtnews@123`

⚠️ **CHANGE THESE IMMEDIATELY in production!**

Edit `server.js` line where users are initialized:
```javascript
password: bcrypt.hashSync('your_new_strong_password', 10),
```

---

## 🐛 Testing the Backend

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"rtnews@123"}'
```

### Get All Articles
```bash
curl http://localhost:5000/api/articles
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 📁 File Structure

```
├── server.js              # Backend Express server
├── .env                   # Environment variables (local)
├── .env.example           # Template for env vars
├── data.json              # Articles database (auto-created)
├── uploads/               # Uploaded files storage
├── src/
│   ├── lib/articles.ts    # API wrapper functions
│   ├── components/AdminLogin.tsx  # Secure login
│   └── pages/Admin.tsx    # Admin dashboard
└── package.json
```

---

## 🔄 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | User login (rate limited) |
| GET | `/api/articles` | ❌ | Get all articles |
| GET | `/api/articles/:id` | ❌ | Get single article |
| POST | `/api/articles` | ✅ | Create article |
| PUT | `/api/articles/:id` | ✅ | Update article |
| DELETE | `/api/articles/:id` | ✅ | Delete article |
| GET | `/api/health` | ❌ | Health check |

---

## 💡 Future Improvements

1. **Database Migration**: Replace `data.json` with MongoDB/PostgreSQL
2. **User Management**: Multiple admin accounts with different roles
3. **Advanced Analytics**: Track article views and user engagement
4. **Email Notifications**: Send alerts for article updates
5. **CDN Integration**: Serve images from CloudFront/Cloudflare
6. **Backup System**: Auto-backup data to AWS S3
7. **API Rate Limiting**: Per-user request limits
8. **Logging & Monitoring**: Integration with Sentry/DataDog

---

## 📞 Support

For issues or questions:
1. Check the backend logs: `npm run server`
2. Verify `.env` variables are set correctly
3. Ensure port 5000 is not in use
4. Check CORS_ORIGIN matches your frontend URL

**Happy selling! 🎉**
