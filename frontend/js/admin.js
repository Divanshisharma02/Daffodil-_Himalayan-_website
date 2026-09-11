document.addEventListener('DOMContentLoaded', () => {
  fetchAdminStats();
});

async function fetchAdminStats() {
  try {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();

    if (data.success) {
      const stats = data.stats;
      if (document.getElementById('adminTotalBookings')) {
        document.getElementById('adminTotalBookings').innerText = stats.totalBookings;
      }
      if (document.getElementById('adminTotalInquiries')) {
        document.getElementById('adminTotalInquiries').innerText = stats.totalInquiries || 0;
      }
      if (document.getElementById('adminTotalPackages')) {
        document.getElementById('adminTotalPackages').innerText = stats.totalPackages;
      }
      if (document.getElementById('adminTotalRevenue')) {
        document.getElementById('adminTotalRevenue').innerText = `₹${(stats.totalRevenueINR || 0).toLocaleString()}`;
      }

      renderRecentBookingsTable(data.recentBookings);
      renderRecentInquiriesTable(data.recentInquiries);
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
      <td>${b.travelDate ? new Date(b.travelDate).toLocaleDateString() : 'N/A'}</td>
      <td class="fw-bold text-success">₹${(b.totalPrice || 0).toLocaleString()}</td>
      <td><span class="badge bg-success">${b.bookingStatus || 'Confirmed'}</span></td>
      <td>
        <a href="/api/bookings/${b.bookingId}/invoice" class="btn btn-sm btn-outline-dark" target="_blank">
          <i class="fas fa-file-pdf text-danger"></i> PDF
        </a>
      </td>
    </tr>
  `).join('');
}

function renderRecentInquiriesTable(inquiries) {
  const tbody = document.getElementById('adminInquiriesTableBody');
  if (!tbody || !inquiries) return;

  if (inquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">No inquiries recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = inquiries.map(inq => `
    <tr>
      <td><small class="text-muted">${inq.timestamp || 'N/A'}</small></td>
      <td><strong>${inq.name || 'Anonymous'}</strong></td>
      <td>
        <span class="d-block small"><i class="fas fa-envelope text-muted me-1"></i>${inq.email || 'N/A'}</span>
        <span class="d-block small"><i class="fas fa-phone text-muted me-1"></i>${inq.phone || 'N/A'}</span>
      </td>
      <td><span class="badge bg-warning text-dark">${inq.subject || 'Expedition'}</span></td>
      <td><small style="max-width: 250px; display: inline-block; white-space: pre-line;">${inq.message || 'N/A'}</small></td>
      <td><span class="badge bg-light text-dark border">${inq.sourcePage || 'Website'}</span></td>
    </tr>
  `).join('');
}
