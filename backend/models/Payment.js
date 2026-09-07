const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  gateway: { type: String, enum: ['Razorpay', 'Stripe', 'PayPal', 'UPI', 'Card', 'Net Banking'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['Success', 'Failed', 'Pending', 'Refunded'], default: 'Pending' },
  gatewayPayload: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
