const express = require('express');
const { getDashboard, getActivities, updateProfile } = require('../controllers/studentController');
const { studentAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/student/dashboard
router.get('/dashboard', studentAuth, getDashboard);

// GET /api/student/activities
router.get('/activities', studentAuth, getActivities);

// PUT /api/student/profile
router.put('/profile', studentAuth, updateProfile);

module.exports = router;