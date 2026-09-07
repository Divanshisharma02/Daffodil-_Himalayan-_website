const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Domestic', 'International', 'Himalayan', 'Spiritual', 'Heritage', 'Beach'], required: true },
  stateOrCountry: { type: String, required: true },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  overview: { type: String, required: true },
  history: { type: String },
  climate: { type: String },
  bestTimeToVisit: { type: String },
  thingsToDo: [{ type: String }],
  coordinates: {
    lat: { type: Number, default: 31.1048 },
    lng: { type: Number, default: 77.1734 }
  },
  popularAttractions: [{
    name: String,
    category: String,
    image: String,
    description: String
  }],
  nearbyHotelsCount: { type: Number, default: 12 },
  nearestAirport: { type: String },
  averageCostPerDayINR: { type: Number, default: 4500 },
  averageCostPerDayUSD: { type: Number, default: 60 },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 128 }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
