import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1); // Required for express-rate-limit behind Hostinger's reverse proxy
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// --- Security Middleware ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = ['https://truegreenintrovert.com', 'https://www.truegreenintrovert.com', 'http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', globalLimiter);

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Too many attempts, please try again later.' }
});
app.use(express.json());

// Setup static serving for uploaded images
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- Auth API ---
app.post('/api/login', strictLimiter, async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    
    // Initial bootstrap: create admin user from .env credentials if no user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
      
      if (email === adminEmail && password === adminPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.user.create({
          data: { email, password: hashedPassword, name: 'Admin' }
        });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, name: user.name });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- Upload API ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  // Return the path where the image can be accessed
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// --- Portfolio API ---
app.get('/api/portfolio', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    const { title, category, description, imageUrl, projectUrl } = req.body;
    const project = await prisma.project.create({
      data: { title, category, description, imageUrl, projectUrl }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/portfolio/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, imageUrl, projectUrl } = req.body;
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: { title, category, description, imageUrl, projectUrl }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/portfolio/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// --- Blog API ---
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ orderBy: { date: 'desc' } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog post' });
  }
});

app.post('/api/blog', authenticateToken, async (req, res) => {
  try {
    const { title, category, excerpt, content, imageUrl, readTime, date } = req.body;
    const post = await prisma.post.create({
      data: { title, category, excerpt, content, imageUrl, readTime, date }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

app.put('/api/blog/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, imageUrl, readTime, date } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, category, excerpt, content, imageUrl, readTime, date }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

app.delete('/api/blog/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// --- Messages API ---
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', strictLimiter, async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;
    const message = await prisma.message.create({
      data: { name, email, subject, content }
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// --- Profile API ---
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || { bio: '', education: '', experience: '', skills: '', imageUrl: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { bio, education, experience, skills, imageUrl } = req.body;
    let profile = await prisma.profile.findFirst();
    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: { bio, education, experience, skills, imageUrl }
      });
    } else {
      profile = await prisma.profile.create({
        data: { bio, education, experience, skills, imageUrl }
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// --- Settings API ---
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    res.json(settings || { email: '', mobile: '', leetcode: '', instagram: '', youtube: '', linkedin: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings', details: error.message });
  }
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const { email, mobile, leetcode, instagram, youtube, linkedin } = req.body;
    let settings = await prisma.settings.findFirst();
    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: { email, mobile, leetcode, instagram, youtube, linkedin }
      });
    } else {
      settings = await prisma.settings.create({
        data: { email, mobile, leetcode, instagram, youtube, linkedin }
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
