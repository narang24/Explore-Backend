const Student = require('../models/Student');
const Activity = require('../models/Activity');
const Club = require('../models/Club');

const getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate('joinedClubs.clubId', 'clubName description category')
      .populate({
        path: 'activities',
        populate: {
          path: 'clubId',
          select: 'clubName'
        }
      });

    // Get recent activities
    const recentActivities = await Activity.find({
      'participants.studentId': req.user.id
    })
    .populate('clubId', 'clubName')
    .sort({ createdAt: -1 })
    .limit(5);

    // Get upcoming events
    const upcomingEvents = await Activity.find({
      eventDate: { $gte: new Date() },
      isActive: true
    })
    .populate('clubId', 'clubName')
    .sort({ eventDate: 1 })
    .limit(6);

    res.json({
      success: true,
      data: {
        student: {
          name: student.name,
          rollNumber: student.rollNumber,
          department: student.department,
          year: student.year,
          joinedClubsCount: student.joinedClubs.length,
          activitiesCount: student.activities.length
        },
        joinedClubs: student.joinedClubs,
        recentActivities,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching dashboard' 
    });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      'participants.studentId': req.user.id
    })
    .populate('clubId', 'clubName description')
    .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: { activities } 
    });
  } catch (error) {
    console.error('Activities error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching activities' 
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ 
      success: true, 
      data: { student } 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating profile' 
    });
  }
};

module.exports = { getDashboard, getActivities, updateProfile };