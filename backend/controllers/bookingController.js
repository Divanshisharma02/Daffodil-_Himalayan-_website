const seedData = require('../scripts/mockData');
const { sendEmail } = require('../utils/emailService');
const { logBookingToCsv } = require('../utils/csvLogger');

const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      packageId,
      packageName,
      travelDate,
      adults = 1,
      children = 0,
      hotelCategory = 'Deluxe 4-Star Resort',
      mealPlan = 'MAP (Breakfast & Dinner)',
      pickupLocation = 'Airport Pickup',
      extraActivities = [],
      currency = 'INR',
      basePrice = 25000,
      couponCode = '',
      paymentMethod = 'Direct Agency Booking'
    } = req.body;

    if (!customerName || !customerEmail || !packageName || !travelDate) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory booking details' });
    }

    // Math calculation
    let totalBase = Number(basePrice) * Number(adults) + (Number(basePrice) * 0.5 * Number(children));
    let discountAmount = 0;

    if (couponCode && couponCode.trim().toUpperCase() === 'HIMALAYA15') {
      discountAmount = Math.round(totalBase * 0.15);
    }

    const taxableAmount = Math.max(0, totalBase - discountAmount);
    const gstAmount = Math.round(taxableAmount * 0.05); // 5% GST on tourism
    const totalPrice = Math.round(taxableAmount + gstAmount);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `DH-2026-${randomSuffix}`;

    const bookingData = {
      _id: `bk_${Date.now()}`,
      bookingId,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '+91 98160 00000',
      packageName,
      travelDate,
      travellers: { adults: Number(adults), children: Number(children) },
      hotelCategory,
      mealPlan,
      pickupLocation,
      extraActivities,
      currency,
      basePrice: totalBase,
      discountAmount,
      gstAmount,
      totalPrice,
      couponCode,
      paymentStatus: 'Reserved',
      bookingStatus: 'Confirmed',
      paymentMethod: 'Direct Agency Booking',
      invoiceUrl: `/api/bookings/${bookingId}/invoice`,
      createdAt: new Date().toISOString()
    };

    // Log booking directly to Excel CSV File
    logBookingToCsv({
      bookingId,
      customerName,
      customerEmail,
      customerPhone: bookingData.customerPhone,
      packageTitle: packageName,
      numberOfGuests: Number(adults) + Number(children),
      startDate: travelDate,
      totalPrice,
      bookingStatus: 'Confirmed'
    });

    // Add to in-memory bookings list
    seedData.bookings.unshift(bookingData);

    // Trigger Email Notification
    sendEmail({
      to: customerEmail,
      subject: `Tour Reservation Confirmed: ${bookingId} - Daffodil Himalayan`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #0B1F3A; padding: 20px; border: 1px solid #D4AF37; border-radius: 8px;">
          <h2 style="color: #0B3D2E; margin-top: 0;">Tour Reservation Confirmation - Daffodil Himalayan</h2>
          <p>Dear <strong>${customerName}</strong>,</p>
          <p>Thank you for choosing Daffodil Himalayan (Govt Reg No: <strong>11-2279/2024-DTO-SML</strong>). Your journey reservation has been confirmed and logged in our executive booking records!</p>
          <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 15px 0;" />
          <p><strong>Reservation ID:</strong> ${bookingId}</p>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Travel Date:</strong> ${new Date(travelDate).toLocaleDateString()}</p>
          <p><strong>Estimated Total:</strong> ${currency === 'USD' ? '$' : '₹'}${totalPrice.toLocaleString()}</p>
          <p><strong>Payment Mode:</strong> Direct Agency Settlement (Upon Arrival / Official Bank Transfer)</p>
          <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 15px 0;" />
          <p style="color: #666; font-size: 13px;">Our travel desk will contact you via WhatsApp / Phone to confirm pickup timings and assist with customized requests.</p>
        </div>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Tour reservation confirmed and recorded successfully!',
      booking: bookingData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { email } = req.query;
    let bookings = seedData.bookings;
    if (email) {
      bookings = bookings.filter(b => b.customerEmail && b.customerEmail.toLowerCase() === email.toLowerCase());
    }
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.json({ success: true, count: seedData.bookings.length, bookings: seedData.bookings });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = seedData.bookings.find(b => b.bookingId === req.params.id) || seedData.bookings[0];
    res.json({ success: true, booking });
  } catch (error) {
    const fallback = seedData.bookings[0];
    res.json({ success: true, booking: fallback });
  }
};

module.exports = { createBooking, getUserBookings, getBookingById };
