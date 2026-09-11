const seedData = require('../scripts/mockData');
const { generateInvoicePDF } = require('../utils/pdfGenerator');

const downloadInvoice = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = seedData.bookings.find(b => b.bookingId === bookingId) || seedData.bookings[0];

    generateInvoicePDF(booking, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate PDF invoice: ' + error.message });
  }
};

module.exports = { downloadInvoice };
