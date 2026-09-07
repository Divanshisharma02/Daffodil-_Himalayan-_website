const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Destination = require('../models/Destination');
const Package = require('../models/Package');
const Hotel = require('../models/Hotel');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const Coupon = require('../models/Coupon');
const mockData = require('./mockData');
const bcrypt = require('bcryptjs');

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/daffodil_himalayan';
    console.log(`[Seed Script] Connecting to MongoDB: ${mongoURI}`);
    await mongoose.connect(mongoURI);

    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Package.deleteMany({});
    await Hotel.deleteMany({});
    await Flight.deleteMany({});
    await Booking.deleteMany({});
    await Coupon.deleteMany({});

    console.log('[Seed Script] Cleared existing records...');

    // Seed Admin User
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('Admin@123456', salt);

    await User.create({
      name: 'Daffodil Master Admin',
      email: 'admin@daffodil.com',
      password: adminPassword,
      phone: '+91 98160 00000',
      role: 'admin'
    });

    // Seed Coupons
    await Coupon.create({
      code: 'HIMALAYA15',
      discountPercentage: 15,
      maxDiscountINR: 5000,
      validUntil: new Date('2027-12-31')
    });

    // Seed Main Collections
    await Destination.insertMany(mockData.destinations);
    await Package.insertMany(mockData.packages);
    await Hotel.insertMany(mockData.hotels);
    await Flight.insertMany(mockData.flights);
    await Booking.insertMany(mockData.bookings);

    console.log('✅ [Seed Complete] Successfully populated Daffodil Himalayan database with luxury travel records!');
    process.exit(0);
  } catch (error) {
    console.warn(`⚠️ [Seed Notice] Local MongoDB is offline (${error.message}). Platform will run using built-in mock data engine.`);
    process.exit(0);
  }
};

seedDB();
