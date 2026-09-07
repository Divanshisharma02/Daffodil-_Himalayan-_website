const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const processPayment = async (req, res) => {
  try {
    const { bookingId, gateway = 'Razorpay', amount, currency = 'INR', transactionDetails } = req.body;
    
    const txnId = `PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payment = await Payment.create({
      bookingId,
      transactionId: txnId,
      gateway,
      amount,
      currency,
      status: 'Success',
      gatewayPayload: transactionDetails || {}
    });

    await Booking.findOneAndUpdate(
      { bookingId },
      { paymentStatus: 'Paid', bookingStatus: 'Confirmed', paymentTransactionId: txnId }
    );

    res.json({
      success: true,
      message: 'Payment processed successfully',
      transactionId: txnId,
      status: 'Success'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { processPayment };
