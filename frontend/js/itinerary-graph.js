window.renderItineraryFlowGraph = function(containerId, itinerarySteps) {
  const container = document.getElementById(containerId);
  if (!container || !itinerarySteps || itinerarySteps.length === 0) return;

  let html = `
    <div class="itinerary-graph-container">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span class="section-tag">Expedition Flow Chart</span>
          <h3 class="font-serif m-0">Interactive Tour Itinerary Route</h3>
        </div>
        <span class="badge bg-dark text-warning p-2"><i class="fas fa-route me-1"></i> ${itinerarySteps.length} Days Route</span>
      </div>
      <div class="row align-items-center justify-content-center g-3">
  `;

  itinerarySteps.forEach((step, idx) => {
    html += `
      <div class="col-md-3 col-sm-6">
        <div class="flow-step-node text-center">
          <div class="badge bg-warning text-dark mb-2">Day ${step.day}</div>
          <div class="mb-2"><i class="fas ${step.icon || 'fa-map-marker-alt'} fa-2x text-success"></i></div>
          <h6 class="fw-bold mb-1" style="font-size: 0.95rem;">${step.title}</h6>
          <p class="small text-muted mb-0" style="font-size: 0.78rem;">${step.description}</p>
        </div>
      </div>
    `;

    if (idx < itinerarySteps.length - 1) {
      html += `
        <div class="col-md-1 d-none d-md-flex justify-content-center">
          <div class="flow-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
      `;
    }
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
};
