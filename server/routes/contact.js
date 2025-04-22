const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');


router.post('/', async (req, res) => {
  console.log("Form data received:", req.body);
  try {
    const { name, email, message } = req.body;
    const newMsg = new ContactMessage({ name, email, message });
    await newMsg.save();
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { admin } = req.query;
  if (admin !== 'true') return res.status(403).json({ error: "Unauthorized" });

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
