# Daffodil Himalayan - Premium Travel & Tourism Platform

![Daffodil Himalayan](https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80)

**Daffodil Himalayan** is an ultra-premium travel platform registered with the Tourism Department (Permanent Reg No: **11-2279/2024-DTO-SML**).

---

## 🌟 Key Features

- **Ultra-Luxury Aesthetics**: Minimalistic, off-white background (`#FBF9F5`), Deep Forest Green (`#0B3D2E`), Midnight Blue (`#0B1F3A`), and Gold Accent (`#D4AF37`) palette.
- **Dynamic Dual Currency Support**: Real-time switching between **₹ INR** and **$ USD** across all packages, hotels, flights, and booking summaries.
- **Interactive SVG Itinerary Flow Graph**: Visual day-by-day expedition route nodes rendered dynamically.
- **Interactive Leaflet Maps Integration**: Custom luxury map markers for destination coordinates, hotels, and attractions.
- **Direct Tour Reservation & Inquiry Engine**: Streamlined booking requests without payment gateway friction, storing reservations directly into Excel/CSV spreadsheets.
- **Excel Spreadsheet Export & Management**: Real-time downloadable Excel links (`/api/excel/inquiries`, `/api/excel/bookings`, `/api/excel/users`) and admin inquiry tracking.
- **Automated PDF Invoice Generator**: PDFKit-powered tax invoice generator complete with government registration watermark (`11-2279/2024-DTO-SML`) and QR verification.
- **Admin Control Panel**: View real-time inquiry metrics, active bookings, registered travelers, and direct one-click Excel downloads.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+), Bootstrap 5, Leaflet Maps, FontAwesome 6, AOS Animations
- **Backend**: Node.js, Express.js, Excel CSV Data Engine, JWT Authentication, bcryptjs, Nodemailer, PDFKit
- **Storage**: Real-time Excel/CSV logs (`backend/data/*.csv`) and in-memory travel catalog (`mockData.js`)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Data Stores
Initializes the Excel spreadsheet CSV files:
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
# or
npm start
```

Visit the platform at: `http://localhost:5000`

---

## 📊 Direct Excel Data Links

- **Customer Inquiries Spreadsheet**: `http://localhost:5000/api/excel/inquiries`
- **Tour Bookings Spreadsheet**: `http://localhost:5000/api/excel/bookings`
- **Registered Travelers Spreadsheet**: `http://localhost:5000/api/excel/users`

---

## 📄 Government Registration
- **Company Name**: Daffodil Himalayan
- **Permanent Registration Number**: `11-2279/2024-DTO-SML`
- **Department**: Tourism Department, Govt of Himachal Pradesh
- **Headquarters**: Parkash Kunj, Near Om Niwas, Gahan, Sanjauli, Distt. Shimla (H.P.)
