const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

// GET all users (admin use)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('registeredEvents.eventId');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET single user by ID (including registered events)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('registeredEvents.eventId');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// CREATE new event
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// POST /api/users/:id/register/:eventId
router.post('/:id/register/:eventId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const eventId = req.params.eventId;

    if (!user) return res.status(404).json({ error: 'User not found' });

    const alreadyRegistered = user.registeredEvents.some(e => e.eventId.equals(eventId));
    if (alreadyRegistered) return res.status(400).json({ error: 'Already registered for this event' });

    user.registeredEvents.push({ eventId });
    await user.save();

    res.status(200).json({ message: 'User registered for event' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user for event' });
  }
});

// PUT /api/users/:userId/feedback/:eventId
router.put('/:userId/feedback/:eventId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { eventId } = req.params;
    const { feedback } = req.body;

    const reg = user.registeredEvents.find(e => e.eventId.equals(eventId));
    if (!reg) return res.status(404).json({ error: 'Event not registered by this user' });

    reg.feedback = feedback;
    await user.save();

    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
