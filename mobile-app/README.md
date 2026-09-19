# Daffodil Himalayan - Official Mobile Application (Flutter iOS & Android)

## Overview
Production-grade cross-platform native mobile application matching **Daffodil Himalayan** website luxury aesthetics, government licensing compliance, and real-time backend synchronization.

### Government Registration
- **Govt Reg No:** `11-2279/2024-DTO-SML`
- **Location:** Shimla, Himachal Pradesh
- **Official Desk:** `+91 8219527240` | `daffodilhimalayan@gmail.com`

---

### Brand Color Palette
- **Deep Forest Green:** `#0B3D2E`
- **Midnight Blue:** `#0B1F3A`
- **Regal Gold Accent:** `#D4AF37`
- **Ivory Cream Background:** `#FBF9F5`

---

### Architecture & Directory Structure
```
mobile-app/
├── pubspec.yaml
├── README.md
└── lib/
    ├── main.dart                      # App entry point with MultiProvider & Theme
    ├── theme/
    │   └── app_theme.dart             # Material 3 luxury typography, palette & widgets
    ├── models/
    │   ├── package_model.dart         # TourPackage & ItineraryStep data model
    │   ├── destination_model.dart     # Destination & Attractions data model
    │   └── booking_model.dart         # TourBooking model with CSV/API serialization
    ├── providers/
    │   └── app_state.dart             # Reactive state (Currency INR/USD, Filters, Caching)
    ├── services/
    │   └── api_service.dart           # Unified REST client with live API & offline fallbacks
    └── screens/
        ├── splash_screen.dart         # Animated gold emblem & registration badge
        ├── home_screen.dart           # Hero banner, category chips, package cards, WhatsApp
        ├── package_detail_screen.dart # Interactive day-by-day node flowchart, inclusions
        └── booking_screen.dart        # 2-step booking engine, live pricing & WhatsApp launch
```

---

### Key Features
1. **Live Currency Converter**: Instant toggle between ₹ INR and $ USD across all package cards, detail screens, and booking calculators.
2. **Interactive Itinerary Flowchart**: Visual step-by-step day plan for every expedition.
3. **2-Step Booking Engine**: Instant calculation of adults, children discount (50%), hotel tier upgrades (+35%), and 5% GST.
4. **Backend Sync & WhatsApp Desk**: Submits reservations directly to backend Excel CSV spreadsheets and initiates prefilled WhatsApp messages to `+91 8219527240`.
5. **Offline Flight Mode Resilience**: Built-in graceful offline fallback ensures the app operates even with spotty mountain connectivity.

---

### Running the App
1. Ensure Flutter SDK 3.0+ is installed:
   ```bash
   flutter --version
   ```
2. Install dependencies:
   ```bash
   cd mobile-app
   flutter pub get
   ```
3. Run on connected Android/iOS device or simulator:
   ```bash
   flutter run
   ```
