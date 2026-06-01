require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const app = express();

// Set up PostgreSQL driver pool and adapter for Prisma v7
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 5000;

// Security: Enforce strict CORS policy - no wildcards
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Express built-in parser for JSON bodies
app.use(express.json());

// Security: Simple in-memory rate limiter for backend protection (avoids external dependency)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 100;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  
  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, []);
  }
  
  const requests = ipRequestCounts.get(ip).filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
  requests.push(now);
  ipRequestCounts.set(ip, requests);
  
  if (requests.length > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ message: 'Too many requests from this IP, please try again later.' });
  }
  next();
}

app.use(rateLimiter);

// TODO(security): Implement CSRF protection if session/auth cookies are adopted later.
// TODO(security): Consider integration with third-party OAuth providers and multi-factor authentication (MFA).

// Registration POST endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 1. Input Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      return res.status(400).json({ message: 'Full name is required.' });
    }
    
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Password is required.' });
    }

    // Security: Enforce password complexity (at least 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // 3. Password Hashing (using bcryptjs with unique per-user salts)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Database Persistence via Prisma ORM (auto-parameterized queries prevent SQL injection)
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      }
    });

    // 5. Secure Response: Return generic success and mask/exclude credentials or sensitive database keys
    return res.status(201).json({
      message: 'Registration successful!',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    // Security: Log error internally without printing user credentials/JWT tokens, and return generic error message
    console.error('Registration internal server error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Bind server ONLY to 127.0.0.1 / localhost for secure local testing
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend server successfully listening on http://127.0.0.1:${PORT}`);
});
