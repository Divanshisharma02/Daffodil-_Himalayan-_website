const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { errorHandler } = require('./middleware/errorMiddleware');
const { usersCsvPath, inquiriesCsvPath, bookingsCsvPath } = require('./utils/csvLogger');

// Route Handlers
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

// Middleware
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, // Enable inline styles & assets from external CDNs (Unsplash, Bootstrap, GSAP, Google Fonts)
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Direct Excel Spreadsheet Export Endpoints
app.get('/api/excel/inquiries', (req, res) => {
  if (fs.existsSync(inquiriesCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_customer_inquiries.csv"');
    return res.sendFile(inquiriesCsvPath);
  }
  res.status(404).json({ success: false, message: 'Inquiries Excel CSV sheet not found' });
});

app.get('/api/excel/bookings', (req, res) => {
  if (fs.existsSync(bookingsCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_tour_bookings.csv"');
    return res.sendFile(bookingsCsvPath);
  }
  res.status(404).json({ success: false, message: 'Bookings Excel CSV sheet not found' });
});

app.get('/api/excel/users', (req, res) => {
  if (fs.existsSync(usersCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_registered_users.csv"');
    return res.sendFile(usersCsvPath);
  }
  res.status(404).json({ success: false, message: 'Users Excel CSV sheet not found' });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Operational',
    company: 'Daffodil Himalayan',
    registrationNo: '11-2279/2024-DTO-SML',
    storageMode: 'Excel CSV + Real-time In-Memory Engine',
    timestamp: new Date().toISOString()
  });
});

// Fallback for HTML routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 DAFFODIL HIMALAYAN TRAVEL PLATFORM ONLINE`);
  console.log(`📌 Govt Reg No: 11-2279/2024-DTO-SML`);
  console.log(`📊 Storage Engine: Excel CSV Spreadsheets & Live In-Memory`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
