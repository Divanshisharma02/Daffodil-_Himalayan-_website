const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  updateBookingStatus,
  addPackage,
  exportUsersCsv,
  exportInquiriesCsv,
  exportBookingsCsv
} = require('../controllers/adminController');

router.get('/stats', getAdminStats);
router.put('/bookings/:bookingId', updateBookingStatus);
router.post('/packages', addPackage);
router.get('/export/users', exportUsersCsv);
router.get('/export/inquiries', exportInquiriesCsv);
router.get('/export/bookings', exportBookingsCsv);

module.exports = router;
