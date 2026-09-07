const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  packageName: { type: String, required: true },
  travelDate: { type: Date, required: true },
  travellers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 }
  },
  hotelCategory: { type: String, default: 'Deluxe 4-Star Resort' },
  mealPlan: { type: String, default: 'MAP (Breakfast & Dinner)' },
  pickupLocation: { type: String, default: 'Airport / Railway Station' },
  extraActivities: [{ type: String }],
  currency: { type: String, enum: ['INR', 'USD'], default: 'INR' },
  basePrice: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  gstAmount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  couponCode: { type: String, default: '' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
  bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['Razorpay', 'Stripe', 'PayPal', 'UPI', 'Card', 'Net Banking'], default: 'Razorpay' },
  paymentTransactionId: { type: String, default: '' },
  invoiceUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
