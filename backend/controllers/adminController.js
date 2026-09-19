const seedData = require('../scripts/mockData');
const { usersCsvPath, inquiriesCsvPath, bookingsCsvPath, getInquiriesFromCsv } = require('../utils/csvLogger');
const fs = require('fs');

const getAdminStats = async (req, res) => {
  try {
    const totalBookings = seedData.bookings.length;
    const inquiries = getInquiriesFromCsv();
    const totalInquiries = inquiries.length;
    const totalPackages = seedData.packages.length;
    const totalDestinations = seedData.destinations.length;
    const bookingsList = seedData.bookings.slice(0, 10);
    const totalRevenueINR = bookingsList.reduce((acc, b) => acc + (b.totalPrice || 0), 0) || 1450000;

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalInquiries,
        totalUsers: 48,
        totalPackages,
        totalDestinations,
        totalRevenueINR
      },
      recentBookings: bookingsList,
      recentInquiries: inquiries.slice(0, 10)
    });
  } catch (error) {
    res.json({
      success: true,
      stats: {
        totalBookings: seedData.bookings.length,
        totalInquiries: 0,
        totalUsers: 48,
        totalPackages: seedData.packages.length,
        totalDestinations: seedData.destinations.length,
        totalRevenueINR: 1450000
      },
      recentBookings: seedData.bookings
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;

    const booking = seedData.bookings.find(b => b.bookingId === bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: `Booking ID '${bookingId}' not found in registry.` });
    }

    booking.bookingStatus = bookingStatus || booking.bookingStatus;
    res.json({ success: true, message: 'Booking status updated successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addPackage = async (req, res) => {
  try {
    const newPkg = {
      _id: `pkg_${Date.now()}`,
      ...req.body
    };
    seedData.packages.unshift(newPkg);
    res.status(201).json({ success: true, package: newPkg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const exportUsersCsv = (req, res) => {
  if (fs.existsSync(usersCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_registered_users.csv"');
    return res.sendFile(usersCsvPath);
  }
  res.status(404).json({ success: false, message: 'Users CSV record not found' });
};

const exportInquiriesCsv = (req, res) => {
  if (fs.existsSync(inquiriesCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_customer_inquiries.csv"');
    return res.sendFile(inquiriesCsvPath);
  }
  res.status(404).json({ success: false, message: 'Inquiries CSV record not found' });
};

const exportBookingsCsv = (req, res) => {
  if (fs.existsSync(bookingsCsvPath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="daffodil_tour_bookings.csv"');
    return res.sendFile(bookingsCsvPath);
  }
  res.status(404).json({ success: false, message: 'Bookings CSV record not found' });
};

module.exports = {
  getAdminStats,
  updateBookingStatus,
  addPackage,
  exportUsersCsv,
  exportInquiriesCsv,
  exportBookingsCsv
};
