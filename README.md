# 🔴 RT NEWS - Production-Ready News Platform

A secure, full-stack news website with admin panel, real-time search, multi-language support, and complete backend security.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login with bcryptjs password hashing
- **📰 Article Management**: Full CRUD operations via admin panel
- **🎬 Media Support**: Upload and display images and videos
- **🔍 Real-Time Search**: Instant article filtering and category selection
- **🌙 Theme Toggle**: Day/night mode with persistent storage
- **🇵🇰 Multi-Language**: English and Urdu support with RTL layout
- **⚡ Rate Limiting**: Protection against brute force attacks
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🛡️ SEO-Friendly**: Proper robots.txt, noindex tags, structured content
- **🚀 Production-Ready**: Helmet.js security headers, CORS protection, input validation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### 1. Install Dependencies
```bash
npm install


### 2. Create Environment File
Create `.env` file in root:
```
PORT=5000
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5174
NODE_ENV=development
VITE_API_URL=http://localhost:5000
```

### 3. Start Both Servers

**Terminal 1 - Backend (Port 5000):**
```bash
npm run server
```

**Terminal 2 - Frontend (Port 5173/5174):**
```bash
npm run dev
```

**Or Both Together:**
```bash
npm run dev:all
```

### 4. Access the Application
- **Frontend**: http://localhost:5174
- **Admin Panel**: http://localhost:5174/admin
	- Username: `admin`
	- Password: `rtnews@123`

## 📁 Project Structure

```
RT-NEWS/
├── server.js                    # Express backend
├── .env                         # Environment variables (local)
├── .env.example                 # Environment template
├── data.json                    # Article database
├── src/
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   ├── Admin.tsx           # Admin dashboard
│   │   ├── ArticleDetail.tsx   # Article detail view
│   │   └── *.tsx               # Policy pages
│   ├── components/
│   │   ├── Header.tsx          # Navigation & search
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── AdminLogin.tsx      # Secure login
│   │   └── *.tsx               # Other components
│   ├── lib/
│   │   └── articles.ts         # API wrapper functions
│   └── context/
│       └── SearchContext.tsx   # Global search state
├── public/
│   ├── robots.txt              # SEO crawling rules
│   └── images/                 # Logo and media
└── package.json
```

## 🔐 Security Features Implemented

| Feature | Details |
|---------|---------|
| **JWT Authentication** | 24-hour token expiration |
| **Password Hashing** | bcryptjs with 10 salt rounds |
| **Rate Limiting** | 5 login attempts per 15 minutes |
| **CORS Protection** | Configurable allowed origins |
| **Input Validation** | Length limits on all user inputs |
| **File Validation** | Whitelist of allowed MIME types |
| **Security Headers** | Helmet.js for HTTP headers |
| **NoIndex Tags** | Admin pages hidden from search engines |
| **robots.txt Rules** | /admin routes blocked from crawlers |

## 🌐 Deployment

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) and [SECURITY_DEPLOYMENT.md](./SECURITY_DEPLOYMENT.md) for complete deployment guides.

### Quick Deployment to Render (FREE)
1. Push to GitHub
2. Create web service on Render.com
3. Set environment variables
4. Deploy frontend to Vercel
5. Done! ✅

## 🔑 API Endpoints

### Authentication
```
POST /api/auth/login
	Body: { "username": "admin", "password": "..." }
	Response: { "token": "jwt...", "user": {...} }
```

### Articles (Public)
```
GET /api/articles                    # Get all
GET /api/articles/:id                # Get one
```

### Articles (Admin - Requires JWT)
```
POST /api/articles                   # Create
PUT /api/articles/:id                # Update
DELETE /api/articles/:id             # Delete
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Backend**: Express.js, Node.js
- **Authentication**: JWT, bcryptjs
- **Security**: Helmet.js, express-rate-limit, CORS
- **Database**: JSON (can migrate to MongoDB/PostgreSQL)
- **Deployment**: Vercel (frontend), Render (backend)

## 📝 Important Notes

- **Change admin password before production**: Edit `server.js` default credentials
- **Generate strong JWT_SECRET**: Use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Backup data.json regularly** especially before updates
- **Keep Node.js and npm packages updated**: `npm audit fix`

## 📞 Support

For issues or questions:
1. Check [BACKEND_SETUP.md](./BACKEND_SETUP.md) troubleshooting section
2. Review backend logs: `npm run server`
3. Ensure both servers are running
4. Verify `.env` variables are correct

## 📄 License

This project is ready for commercial deployment and sale.
# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7c67b5a6-20ea-4b1e-8937-18386e826321) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
