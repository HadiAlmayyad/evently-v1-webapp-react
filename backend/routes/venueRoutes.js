const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// GET single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
});

// CREATE new venue
router.post('/', async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create venue' });
  }
});

// UPDATE venue info
router.put('/:id', async (req, res) => {
  try {
    const updated = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Venue not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update venue' });
  }
});

// DELETE venue
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Venue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Venue deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete venue' });
  }
});



module.exports = router;
