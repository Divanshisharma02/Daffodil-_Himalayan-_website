const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getBookingById } = require('../controllers/bookingController');
const { downloadInvoice } = require('../controllers/invoiceController');

router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.get('/:id/invoice', downloadInvoice);

module.exports = router;
