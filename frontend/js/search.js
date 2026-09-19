document.addEventListener('DOMContentLoaded', () => {
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = document.getElementById('heroDestInput')?.value || '';
      const travelDate = document.getElementById('heroDateInput')?.value || '';
      const travellers = document.getElementById('heroTravellersInput')?.value || '2';

      window.location.href = `packages.html?destination=${encodeURIComponent(destination)}&date=${travelDate}&travellers=${travellers}`;
    });

    const heroDestInput = document.getElementById('heroDestInput');
    heroDestInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        heroSearchBtn.click();
      }
    });
  }
});
