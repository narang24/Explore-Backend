const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const clubRoutes = require('./routes/club');

dotenv.config();

const app = express();

// Database connection
require('./config/database');

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/club', clubRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Xplore Backend Server Running' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Health check: http://localhost:${PORT}/health`);
});