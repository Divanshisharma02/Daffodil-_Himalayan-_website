document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pkgSlug = urlParams.get('package') || 'royal-kashmir-luxury-expedition';

  fetchPackageForBooking(pkgSlug);
});

let currentPackageData = null;

async function fetchPackageForBooking(slug) {
  try {
    const res = await fetch(`/api/packages/${slug}`);
    const data = await res.json();
    if (data.success && data.package) {
      currentPackageData = data.package;
      renderBookingForm(data.package);
    }
  } catch (err) {
    console.error('Error loading package for booking:', err);
  }
}

function renderBookingForm(pkg) {
  const pkgNameElem = document.getElementById('bookingPkgTitle');
  if (pkgNameElem) pkgNameElem.innerText = pkg.title;

  const basePriceElem = document.getElementById('bookingBasePrice');
  if (basePriceElem) basePriceElem.innerText = window.formatPrice(pkg.priceINR);

  calculateBookingTotal();

  // Attach live math event listeners
  ['adultsInput', 'childrenInput', 'hotelTierSelect', 'couponInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateBookingTotal);
    document.getElementById(id)?.addEventListener('change', calculateBookingTotal);
  });

  document.getElementById('bookingForm')?.addEventListener('submit', handleBookingSubmit);
}

function calculateBookingTotal() {
  if (!currentPackageData) return;

  const adults = parseInt(document.getElementById('adultsInput')?.value || 1, 10);
  const children = parseInt(document.getElementById('childrenInput')?.value || 0, 10);
  const hotelTier = document.getElementById('hotelTierSelect')?.value || 'Deluxe 4-Star Resort';
  const couponCode = document.getElementById('couponInput')?.value?.trim()?.toUpperCase() || '';

  let pricePerAdult = currentPackageData.priceINR;
  if (hotelTier.includes('5-Star') || hotelTier.includes('Aman')) {
    pricePerAdult *= 1.35; // 35% luxury tier upgrade
  }

  let totalBaseINR = (pricePerAdult * adults) + (pricePerAdult * 0.5 * children);
  let discountINR = 0;

  if (couponCode === 'HIMALAYA15') {
    discountINR = totalBaseINR * 0.15;
  }

  const taxableINR = Math.max(0, totalBaseINR - discountINR);
  const gstINR = Math.round(taxableINR * 0.05);
  const finalTotalINR = Math.round(taxableINR + gstINR);

  // Update DOM UI
  if (document.getElementById('summarySubtotal')) {
    document.getElementById('summarySubtotal').innerText = window.formatPrice(totalBaseINR);
  }
  if (document.getElementById('summaryDiscount')) {
    document.getElementById('summaryDiscount').innerText = `-${window.formatPrice(discountINR)}`;
  }
  if (document.getElementById('summaryGst')) {
    document.getElementById('summaryGst').innerText = window.formatPrice(gstINR);
  }
  if (document.getElementById('summaryTotal')) {
    document.getElementById('summaryTotal').innerText = window.formatPrice(finalTotalINR);
  }
}

async function handleBookingSubmit(e) {
  e.preventDefault();

  const customerName = document.getElementById('custName').value;
  const customerEmail = document.getElementById('custEmail').value;
  const customerPhone = document.getElementById('custPhone').value;
  const travelDate = document.getElementById('travelDateInput').value;
  const adults = document.getElementById('adultsInput').value;
  const children = document.getElementById('childrenInput').value;
  const hotelCategory = document.getElementById('hotelTierSelect').value;
  const mealPlan = document.getElementById('mealPlanSelect').value;
  const paymentMethod = 'Direct Agency Booking';
  const couponCode = document.getElementById('couponInput').value;

  if (!customerName || !customerEmail || !travelDate) {
    alert('Please fill out all required fields');
    return;
  }

  const payload = {
    customerName,
    customerEmail,
    customerPhone,
    packageId: currentPackageData._id,
    packageName: currentPackageData.title,
    travelDate,
    adults: Number(adults),
    children: Number(children),
    hotelCategory,
    mealPlan,
    pickupLocation,
    currency: window.DaffodilState.currency,
    basePrice: currentPackageData.priceINR,
    couponCode,
    paymentMethod
  };

  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success && data.booking) {
      alert(`🎉 Tour Reservation Confirmed!\nBooking ID: ${data.booking.bookingId}\nYour booking has been recorded in the official Excel ledger.`);
      window.location.href = `packages.html`;
    } else {
      alert('Booking failed: ' + (data.message || 'Error processing request'));
    }
  } catch (err) {
    alert('Failed to connect to server: ' + err.message);
  }
}
