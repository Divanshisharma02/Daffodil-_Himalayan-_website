const mongoose = require('mongoose');

// Disable query buffering when disconnected so requests fail/fallback in 0ms instead of 10s
mongoose.set('bufferCommands', false);

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/daffodil_himalayan', {
      serverSelectionTimeoutMS: 1500,
      bufferCommands: false
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Notice] Local MongoDB server not detected (${error.message}). Instant Mock & In-Memory Data Engine activated (0ms latency).`);
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
