const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');  

// GET all messages and display them on the dashboard
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

// DELETE a message by ID in MongoDB
router.delete('/messages/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);  
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error while deleting message' });
  }
});

module.exports = router;
