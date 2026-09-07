const PDFDocument = require('pdfkit');

const generateInvoicePDF = (booking, res) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  // Stream PDF to HTTP response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Invoice-${booking.bookingId}.pdf`);

  doc.pipe(res);

  // Background accent banner
  doc.rect(0, 0, 595.28, 120).fill('#0B3D2E');

  // Header Title & Registration
  doc.fillColor('#D4AF37').fontSize(22).font('Helvetica-Bold').text('DAFFODIL HIMALAYAN', 40, 30);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica').text('Government Registered Tourism Company', 40, 58);
  doc.fontSize(9).text('Permanent Reg No: 11-2279/2024-DTO-SML', 40, 72);
  doc.text('Parkash Kunj, Near Om Niwas , Gahan, Sanjauli, Distt. Shimla (H.P.) | daffodilhimalayan@gmail.com', 40, 86);

  // Invoice Title
  doc.fillColor('#0B1F3A').fontSize(18).font('Helvetica-Bold').text('OFFICIAL BOOKING INVOICE', 40, 140);
  doc.fontSize(10).font('Helvetica').fillColor('#555555').text(`Generated: ${new Date().toLocaleDateString()}`, 40, 162);

  // Invoice Metadata Table Box
  doc.rect(40, 180, 515, 80).strokeColor('#E0E0E0').lineWidth(1).stroke();
  doc.fillColor('#0B1F3A').fontSize(10).font('Helvetica-Bold');
  doc.text('Booking ID:', 55, 195);
  doc.font('Helvetica').text(booking.bookingId, 130, 195);

  doc.font('Helvetica-Bold').text('Customer:', 55, 215);
  doc.font('Helvetica').text(`${booking.customerName} (${booking.customerEmail})`, 130, 215);

  doc.font('Helvetica-Bold').text('Payment Status:', 330, 195);
  doc.fillColor(booking.paymentStatus === 'Paid' ? '#2E7D32' : '#D32F2F').font('Helvetica-Bold').text(booking.paymentStatus.toUpperCase(), 430, 195);

  doc.fillColor('#0B1F3A').font('Helvetica-Bold').text('Travel Date:', 330, 215);
  doc.font('Helvetica').text(new Date(booking.travelDate).toLocaleDateString(), 430, 215);

  // Itemized breakdown table header
  doc.rect(40, 280, 515, 25).fill('#0B1F3A');
  doc.fillColor('#D4AF37').fontSize(10).font('Helvetica-Bold').text('Item Description', 50, 287);
  doc.text('Details / Category', 250, 287);
  doc.text('Amount', 470, 287);

  // Item 1: Package
  let y = 315;
  doc.fillColor('#333333').font('Helvetica-Bold').text('Tour Package', 50, y);
  doc.font('Helvetica').text(booking.packageName, 250, y);
  const symbol = booking.currency === 'USD' ? '$' : '₹';
  doc.text(`${symbol}${booking.basePrice.toLocaleString()}`, 470, y);

  // Item 2: Hotel & Meal Plan
  y += 25;
  doc.font('Helvetica-Bold').text('Hotel Category & Meal', 50, y);
  doc.font('Helvetica').text(`${booking.hotelCategory} | ${booking.mealPlan}`, 250, y);
  doc.text('Included', 470, y);

  // Item 3: Travellers
  y += 25;
  doc.font('Helvetica-Bold').text('Traveller Count', 50, y);
  doc.font('Helvetica').text(`${booking.travellers.adults} Adults, ${booking.travellers.children} Children`, 250, y);
  doc.text('--', 470, y);

  // Divider Line
  y += 35;
  doc.moveTo(40, y).lineTo(555, y).strokeColor('#CCCCCC').stroke();

  // Summary Math
  y += 15;
  doc.font('Helvetica').text('Subtotal:', 350, y);
  doc.text(`${symbol}${booking.basePrice.toLocaleString()}`, 470, y);

  y += 18;
  doc.text('Discount / Coupon:', 350, y);
  doc.text(`-${symbol}${booking.discountAmount.toLocaleString()}`, 470, y);

  y += 18;
  doc.text('GST / Taxes (5%):', 350, y);
  doc.text(`${symbol}${booking.gstAmount.toLocaleString()}`, 470, y);

  y += 25;
  doc.rect(340, y - 5, 215, 30).fill('#0B3D2E');
  doc.fillColor('#D4AF37').font('Helvetica-Bold').fontSize(12).text('TOTAL AMOUNT:', 350, y + 3);
  doc.text(`${symbol}${booking.totalPrice.toLocaleString()}`, 465, y + 3);

  // Footer / Verification Notice
  doc.fillColor('#777777').fontSize(9).font('Helvetica')
    .text('Thank you for booking with Daffodil Himalayan. This document is a legally valid tax invoice.', 40, 720, { align: 'center' })
    .text('Support Desk: +91 8219527240 | Official Govt Reg: 11-2279/2024-DTO-SML', 40, 735, { align: 'center' });

  doc.end();
};

module.exports = { generateInvoicePDF };
