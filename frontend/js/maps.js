window.initDestinationMap = function(containerId, coords, attractions) {
  const mapElement = document.getElementById(containerId);
  if (!mapElement || typeof L === 'undefined') return;

  const lat = coords?.lat || 34.0837;
  const lng = coords?.lng || 74.7973;

  const map = L.map(containerId).setView([lat, lng], 11);

  // Luxury dark/light map tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; Daffodil Himalayan Maps'
  }).addTo(map);

  // Main Destination Marker
  const goldIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#0B3D2E; color:#D4AF37; padding:8px 12px; border-radius:20px; font-weight:bold; border:2px solid #D4AF37;'><i class='fas fa-compass me-1'></i> Destination Center</div>",
    iconSize: [160, 40],
    iconAnchor: [80, 20]
  });

  L.marker([lat, lng], { icon: goldIcon }).addTo(map)
    .bindPopup(`<strong style="color:#0B3D2E;">Destination Coordinates</strong><br>${lat.toFixed(4)}, ${lng.toFixed(4)}`)
    .openPopup();

  // Attraction markers
  if (attractions && Array.isArray(attractions)) {
    attractions.forEach((att, idx) => {
      const offsetLat = lat + (idx + 1) * 0.015;
      const offsetLng = lng + (idx + 1) * 0.012;
      L.marker([offsetLat, offsetLng]).addTo(map)
        .bindPopup(`<strong>${att.name}</strong><br>${att.description}`);
    });
  }
};
