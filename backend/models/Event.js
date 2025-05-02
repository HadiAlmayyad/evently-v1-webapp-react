const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  // Splitting datetime
  date: { type: Date, required: true },  // e.g., 2025-04-15
  time: { type: String, required: true }, // e.g., "09:00 AM"

  // New: category field
  category: { type: String, required: true }, // e.g., "Tech", "Music", etc.

  venue: String,
  organiser: String,

  // Optional photo URL or path
  photo: String, // e.g., "/uploads/events/photo1.jpg" or full URL

  // Admin controls
  adminStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: String,

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

// To Compute Upcoming and Past Events
// const now = new Date();
// const upcomingEvents = await Event.find({ date: { $gte: now } });
// const pastEvents = await Event.find({ date: { $lt: now } });
