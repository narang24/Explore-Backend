const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Club = require('../models/Club');
const { validateStudent, validateClub } = require('../utils/validation');

const generateToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const login = async (req, res) => {
  try {
    const { rollNumber, password, clubName } = req.body;

    // Club admin login
    if (clubName) {
      const validation = validateClub({ clubName, adminPassword: password });
      if (!validation.isValid) {
        return res.status(400).json({ 
          success: false, 
          errors: validation.errors 
        });
      }

      const club = await Club.findOne({ clubName });
      if (!club || !(await club.comparePassword(password))) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid club credentials' 
        });
      }

      const token = generateToken(club._id, 'club');
      
      res.json({
        success: true,
        token,
        user: {
          id: club._id,
          clubName: club.clubName,
          description: club.description,
          category: club.category,
          type: 'club'
        }
      });
    } else {
      // Student login
      const validation = validateStudent({ rollNumber, password });
      if (!validation.isValid) {
        return res.status(400).json({ 
          success: false, 
          errors: validation.errors 
        });
      }

      const student = await Student.findOne({ rollNumber });
      if (!student || !(await student.comparePassword(password))) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid student credentials' 
        });
      }

      const token = generateToken(student._id, 'student');
      
      res.json({
        success: true,
        token,
        user: {
          id: student._id,
          rollNumber: student.rollNumber,
          name: student.name,
          email: student.email,
          department: student.department,
          year: student.year,
          type: 'student'
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

const getMe = async (req, res) => {
  try {
    if (req.userType === 'student') {
      const student = await Student.findById(req.user.id)
        .populate('joinedClubs.clubId', 'clubName description category')
        .populate('activities');
      
      res.json({
        success: true,
        user: {
          id: student._id,
          rollNumber: student.rollNumber,
          name: student.name,
          email: student.email,
          department: student.department,
          year: student.year,
          joinedClubs: student.joinedClubs,
          activities: student.activities,
          type: 'student'
        }
      });
    } else if (req.userType === 'club') {
      const club = await Club.findById(req.user.id)
        .populate('members.studentId', 'rollNumber name')
        .populate('events');
      
      res.json({
        success: true,
        user: {
          id: club._id,
          clubName: club.clubName,
          description: club.description,
          category: club.category,
          members: club.members,
          events: club.events,
          type: 'club'
        }
      });
    }
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching user data' 
    });
  }
};

module.exports = { login, getMe };