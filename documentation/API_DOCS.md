# Daffodil Himalayan - REST API Documentation

**Official Govt Registration No:** `11-2279/2024-DTO-SML`

## Authentication API (`/api/auth`)
- **`POST /api/auth/register`**: Registers a new user or admin account.
  - Body: `{ name, email, password, phone, country }`
- **`POST /api/auth/login`**: Authenticates credentials and returns JWT bearer token.
  - Body: `{ email, password }`
- **`GET /api/auth/profile`**: Returns protected profile details (Header: `Authorization: Bearer <token>`).

## Tour Packages API (`/api/packages`)
- **`GET /api/packages`**: Query tour packages with multi-criteria filters.
  - Parameters: `destination`, `category`, `search`, `minPrice`, `maxPrice`, `isBestSeller`, `isAdventure`, `isTempleTour`.
- **`GET /api/packages/:slug`**: Retrieves single package details including interactive SVG itinerary step array.

## Destinations API (`/api/destinations`)
- **`GET /api/destinations`**: Returns pan-India and international sanctuaries.
- **`GET /api/destinations/:slug`**: Returns single destination overview, history, coordinates, and nearby attraction markers.

## Bookings & Invoice API (`/api/bookings`)
- **`POST /api/bookings`**: Submits a new booking. Calculates 5% GST and applies discount coupons (`HIMALAYA15`). Generates unique Booking ID (`DH-2026-XXXX`).
- **`GET /api/bookings`**: Returns booking history for user or admin.
- **`GET /api/bookings/:id/invoice`**: Downloads official PDF tax invoice complete with government registration header watermark and QR code.

## Admin Management API (`/api/admin`)
- **`GET /api/admin/stats`**: Returns gross revenue INR, total bookings, active users, and package counts.
- **`PUT /api/admin/bookings/:bookingId`**: Updates booking status (`Confirmed`, `Cancelled`, `Completed`).
