require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../models/userSchema'); 

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcryptjs.hash('admin123', 10);
    const adminUser = new User({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin', 
    });

    await adminUser.save();
    console.log('Admin created successfully');
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
