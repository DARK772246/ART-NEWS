import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload setup
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Initialize data storage
const dataFile = path.join(__dirname, 'data.json');
const initializeData = () => {
  if (!fs.existsSync(dataFile)) {
    const initialData = {
      users: [
        {
          id: '1',
          username: 'admin',
          password: bcrypt.hashSync('rtnews@123', 10),
          email: 'admin@rtnews.com',
          role: 'admin'
        }
      ],
      articles: [],
      lastArticleId: 0
    };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
};

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    return { users: [], articles: [], lastArticleId: 0 };
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rtnews_secret_key_change_in_production');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ROUTES

// Login
app.post('/api/auth/login', loginLimiter, (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const data = readData();
    const user = data.users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'rtnews_secret_key_change_in_production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all articles
app.get('/api/articles', (req, res) => {
  try {
    const data = readData();
    res.json(data.articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get single article
app.get('/api/articles/:id', (req, res) => {
  try {
    const data = readData();
    const article = data.articles.find(a => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Create article (protected)
app.post('/api/articles', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
  try {
    const { title, excerpt, content, category, author, isHero, isBreaking } = req.body;

    // Input validation
    if (!title || !excerpt || !content || !category || !author) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (title.length > 500 || excerpt.length > 1000 || content.length > 50000) {
      return res.status(400).json({ error: 'Content too long' });
    }

    const data = readData();
    const newArticle = {
      id: `article_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title.substring(0, 500),
      excerpt: excerpt.substring(0, 1000),
      content: content.substring(0, 50000),
      category: category.substring(0, 50),
      author: author.substring(0, 100),
      time: new Date().toLocaleString(),
      image: req.files?.image ? req.files.image[0].filename : null,
      video: req.files?.video ? req.files.video[0].filename : null,
      isHero: isHero === 'true',
      isBreaking: isBreaking === 'true',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.articles.push(newArticle);
    writeData(data);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article (protected)
app.put('/api/articles/:id', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
  try {
    const { title, excerpt, content, category, author, isHero, isBreaking } = req.body;
    const data = readData();
    const articleIndex = data.articles.findIndex(a => a.id === req.params.id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = data.articles[articleIndex];
    article.title = title || article.title;
    article.excerpt = excerpt || article.excerpt;
    article.content = content || article.content;
    article.category = category || article.category;
    article.author = author || article.author;
    article.isHero = isHero === 'true' ? true : (isHero === 'false' ? false : article.isHero);
    article.isBreaking = isBreaking === 'true' ? true : (isBreaking === 'false' ? false : article.isBreaking);
    if (req.files?.image) article.image = req.files.image[0].filename;
    if (req.files?.video) article.video = req.files.video[0].filename;
    article.updatedAt = new Date().toISOString();

    data.articles[articleIndex] = article;
    writeData(data);

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article (protected)
app.delete('/api/articles/:id', verifyToken, (req, res) => {
  try {
    const data = readData();
    const articleIndex = data.articles.findIndex(a => a.id === req.params.id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const deleted = data.articles.splice(articleIndex, 1);
    writeData(data);

    res.json({ success: true, deleted: deleted[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Serve uploaded files
app.get('/uploads/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize data
initializeData();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 RT NEWS Backend running on http://localhost:${PORT}`);
  console.log(`📁 Data file: ${dataFile}`);
  console.log(`⚠️  Change JWT_SECRET in production!`);
});
