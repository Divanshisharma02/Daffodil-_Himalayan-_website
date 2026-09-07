// Global State & Currency Handler
window.DaffodilState = {
  currency: localStorage.getItem('daffodil_currency') || 'INR',
  exchangeRateUSD: 0.012, // 1 INR = 0.012 USD
  user: JSON.parse(localStorage.getItem('daffodil_user') || 'null')
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCurrencySelector();
  initFullscreenToggle();
  updateAuthHeader();
  initGlobalBookNowModal(); // Initialize the global Book Now Enquiry Modal
});

function initFullscreenToggle() {
  const btn = document.getElementById('fullscreenToggleBtn');
  if (!btn) return;

  function updateIcon() {
    if (document.fullscreenElement) {
      btn.innerHTML = '<i class="fas fa-compress me-1"></i> Exit Fullscreen';
    } else {
      btn.innerHTML = '<i class="fas fa-expand me-1"></i> 100% Screen';
    }
  }

  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  document.addEventListener('fullscreenchange', updateIcon);
}

function initNavbar() {
  const nav = document.querySelector('.luxury-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  });
}

function initCurrencySelector() {
  const selector = document.getElementById('currencySelector');
  if (selector) {
    selector.value = window.DaffodilState.currency;
    selector.addEventListener('change', (e) => {
      window.DaffodilState.currency = e.target.value;
      localStorage.setItem('daffodil_currency', e.target.value);
      window.location.reload();
    });
  }
}

function updateAuthHeader() {
  const authContainer = document.getElementById('authNavContainer');
  if (!authContainer) return;

  const user = window.DaffodilState.user;
  if (user) {
    authContainer.innerHTML = `
      <div class="dropdown d-inline-block">
        <button class="btn btn-gold btn-sm dropdown-toggle text-truncate" type="button" data-bs-toggle="dropdown" style="max-width: 180px;">
          <i class="fas fa-user-circle me-1"></i> ${user.name}
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow border-warning">
          <li><a class="dropdown-item fw-semibold" href="dashboard.html"><i class="fas fa-suitcase me-2 text-success"></i>My Bookings</a></li>
          ${user.role === 'admin' ? '<li><a class="dropdown-item text-danger fw-bold" href="admin.html"><i class="fas fa-user-shield me-2"></i>Admin Panel</a></li>' : ''}
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-muted" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
        </ul>
      </div>
    `;

    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('daffodil_user');
      localStorage.removeItem('daffodil_token');
      window.location.href = 'index.html';
    });
  }
}

window.formatPrice = function(amountINR) {
  if (window.DaffodilState.currency === 'USD') {
    const usd = Math.round(amountINR * window.DaffodilState.exchangeRateUSD);
    return `$${usd.toLocaleString()}`;
  }
  return `₹${amountINR.toLocaleString()}`;
};

// Global Booking Modal Handler (injects the 2-step modal & intercepts booking click events)
function initGlobalBookNowModal() {
  // If modal doesn't exist, inject it at the end of the body
  if (!document.getElementById('bookNowModal')) {
    const modalHTML = `
  <div class="modal fade" id="bookNowModal" tabindex="-1" aria-labelledby="bookNowModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg text-dark">
        <div class="modal-header bg-dark text-white border-bottom border-warning">
          <div>
            <h4 class="modal-title font-serif text-warning mb-0" id="bookNowModalLabel"><i class="fas fa-compass me-2"></i> Travel Enquiry & Booking</h4>
            <small class="text-light" id="modalStepSubtitle">Step 1 of 2: Personal & Contact Information</small>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="px-4 pt-3">
          <div class="progress" style="height: 6px;">
            <div id="modalProgressBar" class="progress-bar bg-warning" role="progressbar" style="width: 50%;"></div>
          </div>
        </div>
        <div class="modal-body p-4">
          <form id="multiStepEnquiryForm" novalidate>
            <!-- STEP 1 -->
            <div id="enquiryStep1">
              <h5 class="font-serif mb-3 text-success"><i class="fas fa-user-circle me-2"></i> Step 1: Your Personal Information</h5>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">Full Name <span class="text-danger">*</span></label>
                  <input type="text" id="modalName" class="form-control" placeholder="Your Full Name" required>
                  <div id="modalNameErr" class="text-danger small mt-1" style="display:none;">Full name is compulsory.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Email Address <span class="text-danger">*</span></label>
                  <input type="email" id="modalEmail" class="form-control" placeholder="example@domain.com" required>
                  <div id="modalEmailErr" class="text-danger small mt-1" style="display:none;">Valid email is compulsory.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Phone Number <span class="text-danger">*</span></label>
                  <input type="tel" id="modalPhone" class="form-control" placeholder="10-digit phone number" required>
                  <div id="modalPhoneErr" class="text-danger small mt-1" style="display:none;">Phone number is compulsory.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Number of Travelers <span class="text-danger">*</span></label>
                  <input type="number" id="modalTravelers" class="form-control" min="1" value="2" placeholder="Count (e.g. 2)" required>
                  <div id="modalTravelersErr" class="text-danger small mt-1" style="display:none;">Number of travelers is compulsory.</div>
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Enter Your Message <span class="badge bg-secondary ms-1">Optional</span></label>
                  <textarea id="modalMessage" class="form-control" rows="3" placeholder="Enter your msg... (Optional)"></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="button" id="modalNextBtn" class="btn btn-gold px-4 py-2 fw-bold text-uppercase">
                  Next <i class="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
            <!-- STEP 2 -->
            <div id="enquiryStep2" style="display: none;">
              <h5 class="font-serif mb-3 text-success"><i class="fas fa-route me-2"></i> Step 2: Destination & Itinerary Preferences</h5>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">From Where to Where <span class="text-danger">*</span></label>
                  <input type="text" id="modalDestination" class="form-control" placeholder="e.g. Delhi to Kashmir / Manali" required>
                  <div id="modalDestErr" class="text-danger small mt-1" style="display:none;">Travel route is compulsory.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Travel Date</label>
                  <input type="date" id="modalDate" class="form-control">
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Description / What you want to cover or skip</label>
                  <textarea id="modalDescription" class="form-control" rows="4" placeholder="Enter details on what destinations/attractions you want to cover or skip..."></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-4">
                <button type="button" id="modalBackBtn" class="btn btn-outline-dark px-4 py-2 fw-bold text-uppercase">
                  <i class="fas fa-arrow-left me-2"></i> Back
                </button>
                <button type="submit" id="modalSubmitBtn" class="btn btn-gold px-4 py-2 fw-bold text-uppercase">
                  <i class="fas fa-paper-plane me-2"></i> Submit Enquiry
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);
  }

  // Bind key listeners for Next, Back, Submit
  setupGlobalModalFormHandlers();

  // Intercept all booking triggers on click
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const text = (target.textContent || '').trim().toLowerCase();
    const id = target.getAttribute('id') || '';

    // Matches booking click if:
    // 1. href is booking.html (with or without queries)
    // 2. ID is heroBookNowBtn or starts with bookNow
    // 3. Text content starts with 'book' (e.g. 'Book Now', 'Book Yatra', 'Book Tour', etc.)
    const isBookingClick =
      href.includes('booking.html') ||
      id === 'heroBookNowBtn' ||
      id.startsWith('bookNow') ||
      (text.includes('book') && (text.includes('now') || text.includes('yatra') || text.includes('suite') || text.includes('flight') || text.includes('tour') || text.includes('pkg')));

    if (isBookingClick) {
      e.preventDefault();
      openGlobalBookingModal(target);
    }
  });
}

function openGlobalBookingModal(triggerElement) {
  const modalEl = document.getElementById('bookNowModal');
  if (!modalEl) return;

  const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  
  // Reset fields & errors
  document.getElementById('multiStepEnquiryForm')?.reset();
  showStep(1);

  // Clear step 1 errors
  document.getElementById('modalNameErr').style.display = 'none';
  document.getElementById('modalEmailErr').style.display = 'none';
  document.getElementById('modalPhoneErr').style.display = 'none';
  document.getElementById('modalTravelersErr').style.display = 'none';
  document.getElementById('modalDestErr').style.display = 'none';

  // Intelligently prefill destination
  let destVal = '';

  // Case A: If on details page, get the detail title
  const detailTitle = document.getElementById('detailTitle');
  if (detailTitle) {
    destVal = detailTitle.innerText.trim();
  }

  // Case B: If inside a card, find the title of that card
  if (!destVal && triggerElement) {
    const card = triggerElement.closest('.luxury-card');
    if (card) {
      const cardTitle = card.querySelector('.card-title');
      if (cardTitle) {
        destVal = cardTitle.innerText.trim();
      }
    }
  }

  // Case C: Check hero bar values
  const heroDest = document.getElementById('heroDestInput')?.value || '';
  const heroDate = document.getElementById('heroDateInput')?.value || '';
  const heroTrav = document.getElementById('heroTravellersInput')?.value || '2';

  if (destVal) {
    document.getElementById('modalDestination').value = destVal;
  } else if (heroDest) {
    document.getElementById('modalDestination').value = heroDest;
  }

  if (heroDate) {
    document.getElementById('modalDate').value = heroDate;
  }

  document.getElementById('modalTravelers').value = heroTrav;

  bsModal.show();
}

function showStep(step) {
  if (step === 1) {
    document.getElementById('enquiryStep1').style.display = 'block';
    document.getElementById('enquiryStep2').style.display = 'none';
    document.getElementById('modalProgressBar').style.width = '50%';
    document.getElementById('modalStepSubtitle').textContent = 'Step 1 of 2: Personal & Contact Information';
  } else {
    document.getElementById('enquiryStep1').style.display = 'none';
    document.getElementById('enquiryStep2').style.display = 'block';
    document.getElementById('modalProgressBar').style.width = '100%';
    document.getElementById('modalStepSubtitle').textContent = 'Step 2 of 2: Destination & Itinerary Preferences';
  }
}

function setupGlobalModalFormHandlers() {
  const nextBtn = document.getElementById('modalNextBtn');
  const backBtn = document.getElementById('modalBackBtn');

  nextBtn?.addEventListener('click', () => {
    const name = document.getElementById('modalName').value.trim();
    const email = document.getElementById('modalEmail').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    const travelers = document.getElementById('modalTravelers').value.trim();

    let valid = true;

    if (!name) { document.getElementById('modalNameErr').style.display = 'block'; valid = false; }
    else { document.getElementById('modalNameErr').style.display = 'none'; }

    if (!email || !email.includes('@')) { document.getElementById('modalEmailErr').style.display = 'block'; valid = false; }
    else { document.getElementById('modalEmailErr').style.display = 'none'; }

    if (!phone) { document.getElementById('modalPhoneErr').style.display = 'block'; valid = false; }
    else { document.getElementById('modalPhoneErr').style.display = 'none'; }

    if (!travelers || Number(travelers) < 1) { document.getElementById('modalTravelersErr').style.display = 'block'; valid = false; }
    else { document.getElementById('modalTravelersErr').style.display = 'none'; }

    if (valid) {
      showStep(2);
    }
  });

  backBtn?.addEventListener('click', () => {
    showStep(1);
  });

  document.getElementById('multiStepEnquiryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('modalName').value.trim();
    const email = document.getElementById('modalEmail').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    const travelers = document.getElementById('modalTravelers').value.trim();
    const msg = document.getElementById('modalMessage').value.trim();

    const destination = document.getElementById('modalDestination').value.trim();
    const travelDate = document.getElementById('modalDate').value;
    const description = document.getElementById('modalDescription').value.trim();

    if (!destination) {
      document.getElementById('modalDestErr').style.display = 'block';
      return;
    } else {
      document.getElementById('modalDestErr').style.display = 'none';
    }

    // Log to backend Excel sheet
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email || 'N/A',
          phone: phone || 'N/A',
          subject: `Booking Enquiry: ${destination}`,
          message: `Travelers: ${travelers}\nTravel Date: ${travelDate || 'Not specified'}\nPreferences: ${description || 'None'}\nAdditional Message: ${msg || 'None'}`,
          sourcePage: 'Global Modal'
        })
      });
    } catch (err) {
      console.warn('Backend inquiry logging failed:', err.message);
    }

    const messageText = `Hello Daffodil Himalayan,\n\nI have a Travel Booking Enquiry:\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- No. of Travelers: ${travelers}\n- Message: ${msg || 'None'}\n- Destination (From-To): ${destination}\n- Travel Date: ${travelDate || 'Not specified'}\n- Cover/Skip Preferences: ${description || 'None'}`;

    const waUrl = `https://wa.me/918219527240?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');

    alert(`Thank you, ${name}! Your travel enquiry has been successfully submitted.\n\nA confirmation email has been dispatched to ${email || 'your email address'}, and our travel team will reach out to you shortly.`);
    document.getElementById('multiStepEnquiryForm').reset();
    showStep(1);
    
    const modalEl = document.getElementById('bookNowModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal?.hide();
  });
}
