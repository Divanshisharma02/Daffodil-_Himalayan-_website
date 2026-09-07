const mongoose = require('mongoose');

const itineraryStepSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'fa-map-marker-alt' },
  activityType: { type: String, default: 'Sightseeing' } // Arrival, Sightseeing, Adventure, Temple, Departure
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  country: { type: String, default: 'India' },
  durationDays: { type: Number, required: true },
  durationNights: { type: Number, required: true },
  priceINR: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 84 },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  overview: { type: String, required: true },
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  badges: {
    isBestSeller: { type: Boolean, default: false },
    isFamilyFriendly: { type: Boolean, default: true },
    isAdventure: { type: Boolean, default: false },
    isLuxury: { type: Boolean, default: true },
    isTempleTour: { type: Boolean, default: false },
    isHeritage: { type: Boolean, default: false }
  },
  itinerary: [itineraryStepSchema],
  hotelCategories: [{
    name: String, // Standard 3-Star, Deluxe 4-Star, Luxury 5-Star Aman-Tier
    priceModifierPercentage: Number
  }],
  mealPlans: [{
    name: String, // EP (Room only), CP (Breakfast), MAP (Breakfast + Dinner), AP (All Meals)
    additionalCostINR: Number,
    additionalCostUSD: Number
  }],
  availableDates: [{ type: Date }],
  maxGroupSize: { type: Number, default: 16 }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
