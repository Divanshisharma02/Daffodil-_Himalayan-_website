const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true }, // Luxury Suite, Deluxe Mountain View, Royal Pavilion
  priceINR: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  capacity: { type: Number, default: 2 },
  amenities: [{ type: String }],
  availableCount: { type: Number, default: 5 }
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  destinationSlug: { type: String, required: true },
  starRating: { type: Number, default: 5 },
  overview: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  amenities: [{ type: String }], // Infinity Pool, Spa, Helipad, Organic Dining, Butler Service
  coordinates: {
    lat: { type: Number, default: 31.1048 },
    lng: { type: Number, default: 77.1734 }
  },
  rooms: [roomSchema],
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 64 }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
