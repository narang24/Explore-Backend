const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Club = require('../models/Club');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type === 'student') {
      const student = await Student.findById(decoded.id).select('-password');
      if (!student) {
        return res.status(401).json({ message: 'Student not found' });
      }
      req.user = student;
      req.userType = 'student';
    } else if (decoded.type === 'club') {
      const club = await Club.findById(decoded.id).select('-adminPassword');
      if (!club) {
        return res.status(401).json({ message: 'Club not found' });
      }
      req.user = club;
      req.userType = 'club';
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const studentAuth = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.userType !== 'student') {
      return res.status(403).json({ message: 'Access denied. Student only.' });
    }
    next();
  });
};

const clubAuth = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.userType !== 'club') {
      return res.status(403).json({ message: 'Access denied. Club admin only.' });
    }
    next();
  });
};

module.exports = { auth, studentAuth, clubAuth };