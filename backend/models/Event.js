const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  datetime: { type: Date, required: true },  // e.g., 2025-04-15T14:30:00.000Z

  // New: category field
  category: { type: String, required: true }, // e.g., "Tech", "Music", etc.

  venue: { type: String, required: true },
  organizer: { type: String, required: true },

  registrationRequired: String,
  registrationMethod: String,
  // Optional photo URL or path
  thumbnail: String, // e.g., "/uploads/events/photo1.jpg" or full URL

  // Admin controls
  adminStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: String,

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

// To Compute Upcoming and Past Events
// const now = new Date();
// const upcomingEvents = await Event.find({ datetime: { $gte: now } });
// const pastEvents = await Event.find({ datetime: { $lt: now } });
