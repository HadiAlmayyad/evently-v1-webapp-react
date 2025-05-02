const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Attendee', 'Organizer', 'Admin'], default: 'Attendee' },
  stuId: String,
  major: String,
  gender: String,
  accountState: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },

  // Embedded registered events
  registeredEvents: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
      registeredAt: { type: Date, default: Date.now },

      // Optional feedback after attending
      feedback: {
        comment_1: String,
        comment_2: String,
        location: String, // ratings (e.g. 1–10)
        date: String,
        time: String,
        food: String,
        overall: String,
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
