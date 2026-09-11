const path = require('path');
const fs = require('fs');
const { initCsvFiles, inquiriesCsvPath, bookingsCsvPath, usersCsvPath } = require('../utils/csvLogger');

const seedData = () => {
  try {
    console.log('[Seed] Initializing Excel CSV data stores...');
    initCsvFiles();
    console.log(`✅ CSV files ready at: ${path.join(__dirname, '../data')}`);
    console.log('✅ Daffodil Himalayan travel catalog running seamlessly with in-memory & CSV engine.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
