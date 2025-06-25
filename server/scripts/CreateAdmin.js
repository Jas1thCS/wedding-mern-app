const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // adjust path if needed
require('dotenv').config(); // load MONGO_URI from .env

const createAdmin = async () => {
  const username = 'admin'; // change this if needed
  const password = 'secret123'; // 👈 replace with a secure one

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    console.log(`🎉 Admin created: ${username}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
