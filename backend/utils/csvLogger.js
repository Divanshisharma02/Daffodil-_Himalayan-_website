const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// File paths
const usersCsvPath = path.join(dataDir, 'users.csv');
const inquiriesCsvPath = path.join(dataDir, 'inquiries.csv');
const bookingsCsvPath = path.join(dataDir, 'bookings.csv');

// Helper to sanitize CSV field values to prevent CSV injection or breaking rows
function sanitizeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const stringVal = String(field)
    .replace(/\r\n/g, ' | ')
    .replace(/\r/g, ' | ')
    .replace(/\n/g, ' | ')
    .replace(/"/g, '""');
  return `"${stringVal}"`;
}

// RFC-compliant CSV line parser that respects quoted commas and escaped quotes
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Initialize CSV files with headers if they don't exist
function initCsvFiles() {
  if (!fs.existsSync(usersCsvPath)) {
    const header = 'Timestamp,Name,Email,Phone,Country,Role\n';
    fs.writeFileSync(usersCsvPath, header, 'utf8');
  }

  if (!fs.existsSync(inquiriesCsvPath)) {
    const header = 'Timestamp,Name,Email,Phone,Subject_Or_Interest,Message,Source_Page\n';
    fs.writeFileSync(inquiriesCsvPath, header, 'utf8');
  }

  if (!fs.existsSync(bookingsCsvPath)) {
    const header = 'Timestamp,BookingID,CustomerName,Email,Phone,PackageTitle,Guests,TravelDate,TotalPriceINR,Status\n';
    fs.writeFileSync(bookingsCsvPath, header, 'utf8');
  }
}

// Log a newly registered user into users.csv
function logUserToCsv(userData) {
  try {
    initCsvFiles();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const row = [
      sanitizeCsvField(timestamp),
      sanitizeCsvField(userData.name),
      sanitizeCsvField(userData.email),
      sanitizeCsvField(userData.phone || 'N/A'),
      sanitizeCsvField(userData.country || 'India'),
      sanitizeCsvField(userData.role || 'user')
    ].join(',') + '\n';

    fs.appendFileSync(usersCsvPath, row, 'utf8');
    console.log(`[Excel CSV Logger] Registered user logged to users.csv: ${userData.email}`);
  } catch (err) {
    console.error(`[CSV Logger Error] Could not save user to CSV: ${err.message}`);
  }
}

// Log a user inquiry/query into inquiries.csv
function logInquiryToCsv(inquiryData) {
  try {
    initCsvFiles();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const row = [
      sanitizeCsvField(timestamp),
      sanitizeCsvField(inquiryData.name),
      sanitizeCsvField(inquiryData.email),
      sanitizeCsvField(inquiryData.phone || 'N/A'),
      sanitizeCsvField(inquiryData.subject || inquiryData.interest || 'General Inquiry'),
      sanitizeCsvField(inquiryData.message || 'N/A'),
      sanitizeCsvField(inquiryData.sourcePage || 'Website Form')
    ].join(',') + '\n';

    fs.appendFileSync(inquiriesCsvPath, row, 'utf8');
    console.log(`[Excel CSV Logger] Inquiry logged to inquiries.csv: ${inquiryData.name} (${inquiryData.email})`);
  } catch (err) {
    console.error(`[CSV Logger Error] Could not save inquiry to CSV: ${err.message}`);
  }
}

// Log a tour booking into bookings.csv
function logBookingToCsv(bookingData) {
  try {
    initCsvFiles();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const row = [
      sanitizeCsvField(timestamp),
      sanitizeCsvField(bookingData.bookingId || 'BK-' + Date.now()),
      sanitizeCsvField(bookingData.customerName || bookingData.name),
      sanitizeCsvField(bookingData.customerEmail || bookingData.email),
      sanitizeCsvField(bookingData.customerPhone || bookingData.phone || 'N/A'),
      sanitizeCsvField(bookingData.packageTitle || 'Custom Tour'),
      sanitizeCsvField(bookingData.numberOfGuests || 1),
      sanitizeCsvField(bookingData.startDate || 'N/A'),
      sanitizeCsvField(bookingData.totalPrice || 0),
      sanitizeCsvField(bookingData.bookingStatus || 'Confirmed')
    ].join(',') + '\n';

    fs.appendFileSync(bookingsCsvPath, row, 'utf8');
    console.log(`[Excel CSV Logger] Booking logged to bookings.csv: ${bookingData.bookingId}`);
  } catch (err) {
    console.error(`[CSV Logger Error] Could not save booking to CSV: ${err.message}`);
  }
}

// Read inquiries for Admin API
function getInquiriesFromCsv() {
  try {
    initCsvFiles();
    if (!fs.existsSync(inquiriesCsvPath)) return [];
    const content = fs.readFileSync(inquiriesCsvPath, 'utf8');
    const lines = content.trim().split(/\r?\n/).slice(1);
    return lines
      .filter(line => line.trim().length > 0)
      .map(line => {
        const parts = parseCsvLine(line);
        return {
          timestamp: parts[0] || '',
          name: parts[1] || '',
          email: parts[2] || '',
          phone: parts[3] || '',
          subject: parts[4] || '',
          message: parts[5] || '',
          sourcePage: parts[6] || ''
        };
      })
      .reverse();
  } catch (err) {
    return [];
  }
}

// Initialize immediately upon requiring
initCsvFiles();

module.exports = {
  initCsvFiles,
  logUserToCsv,
  logInquiryToCsv,
  logBookingToCsv,
  getInquiriesFromCsv,
  usersCsvPath,
  inquiriesCsvPath,
  bookingsCsvPath
};
