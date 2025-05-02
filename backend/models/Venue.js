const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true }, // e.g., Building 22, Room 101
  availableDates: {type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);

//   // Each date holds an array of available time ranges
//   availableSlots: [
//     {
//       date: { type: Date, required: true },
//       times: [{ type: String }] // e.g., ["10:00 AM", "12:00 PM", "3:00 PM"]
//     }
//   ],
