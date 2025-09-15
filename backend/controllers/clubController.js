const Club = require('../models/Club');
const Activity = require('../models/Activity');
const Student = require('../models/Student');

const getDashboard = async (req, res) => {
  try {
    const club = await Club.findById(req.user.id)
      .populate('members.studentId', 'rollNumber name department')
      .populate('events');

    const totalEvents = await Activity.countDocuments({ clubId: req.user.id });
    const upcomingEvents = await Activity.find({
      clubId: req.user.id,
      eventDate: { $gte: new Date() }
    }).sort({ eventDate: 1 }).limit(5);

    res.json({
      success: true,
      data: {
        club: {
          clubName: club.clubName,
          description: club.description,
          category: club.category,
          membersCount: club.members.length,
          eventsCount: totalEvents
        },
        members: club.members,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Club dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching club dashboard' 
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location, maxParticipants, activityType } = req.body;
    
    const club = await Club.findById(req.user.id);
    
    const activity = new Activity({
      title,
      description,
      activityType: activityType || 'event',
      clubId: req.user.id,
      createdBy: club.clubName,
      eventDate,
      location,
      maxParticipants
    });

    await activity.save();
    
    // Add to club's events
    club.events.push(activity._id);
    await club.save();

    res.status(201).json({ 
      success: true, 
      data: { activity } 
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating event' 
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Activity.find({ clubId: req.user.id })
      .populate('participants.studentId', 'rollNumber name')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: { events } 
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching events' 
    });
  }
};

module.exports = { getDashboard, createEvent, getEvents };