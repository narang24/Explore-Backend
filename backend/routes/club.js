const express = require('express');
const { getDashboard, createEvent, getEvents } = require('../controllers/clubController');
const { clubAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/club/dashboard
router.get('/dashboard', clubAuth, getDashboard);

// POST /api/club/event
router.post('/event', clubAuth, createEvent);

// GET /api/club/events
router.get('/events', clubAuth, getEvents);

module.exports = router;