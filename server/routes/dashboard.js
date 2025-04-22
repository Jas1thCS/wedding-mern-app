// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage'); 

router.get('/messages', async (req, res) => {
    console.log('GET /api/dashboard/messages called');
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
