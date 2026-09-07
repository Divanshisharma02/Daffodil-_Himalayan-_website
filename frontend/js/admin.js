document.addEventListener('DOMContentLoaded', () => {
  fetchAdminStats();
});

async function fetchAdminStats() {
  try {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();

    if (data.success) {
      const stats = data.stats;
      document.getElementById('adminTotalBookings').innerText = stats.totalBookings;
      document.getElementById('adminTotalUsers').innerText = stats.totalUsers;
      document.getElementById('adminTotalPackages').innerText = stats.totalPackages;
      document.getElementById('adminTotalRevenue').innerText = `₹${(stats.totalRevenueINR || 0).toLocaleString()}`;

      renderRecentBookingsTable(data.recentBookings);
    }
  } catch (err) {
    console.error('Error fetching admin statistics:', err);
  }
}

function renderRecentBookingsTable(bookings) {
  const tbody = document.getElementById('adminBookingsTableBody');
  if (!tbody || !bookings) return;

  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td><span class="badge bg-secondary">${b.bookingId}</span></td>
      <td><strong>${b.customerName}</strong><br><small class="text-muted">${b.customerEmail}</small></td>
      <td>${b.packageName}</td>
      <td>${new Date(b.travelDate).toLocaleDateString()}</td>
      <td class="fw-bold text-success">₹${(b.totalPrice || 0).toLocaleString()}</td>
      <td><span class="badge ${b.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}">${b.paymentStatus}</span></td>
      <td>
        <a href="/api/bookings/${b.bookingId}/invoice" class="btn btn-sm btn-outline-dark" target="_blank">
          <i class="fas fa-file-pdf text-danger"></i> PDF
        </a>
      </td>
    </tr>
  `).join('');
}
