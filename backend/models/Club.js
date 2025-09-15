const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'Club name is required'],
    unique: true,
    trim: true
  },
  adminPassword: {
    type: String,
    required: [true, 'Admin password is required'],
    minlength: 6
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technical', 'Cultural', 'Sports', 'Academic', 'Social', 'Other']
  },
  members: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    role: {
      type: String,
      default: 'member',
      enum: ['admin', 'moderator', 'member']
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash admin password before saving
clubSchema.pre('save', async function(next) {
  if (!this.isModified('adminPassword')) return next();
  this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
  next();
});

// Compare password method
clubSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.adminPassword);
};

module.exports = mongoose.model('Club', clubSchema);