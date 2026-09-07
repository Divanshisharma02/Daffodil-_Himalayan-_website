const Hotel = require('../models/Hotel');
const seedData = require('../scripts/mockData');
const { getDBStatus } = require('../config/db');

const getHotels = async (req, res) => {
  try {
    const { destination, search, starRating } = req.query;

    if (!getDBStatus()) {
      let hotels = seedData.hotels;
      if (destination) hotels = hotels.filter(h => h.destinationSlug === destination);
      if (search) hotels = hotels.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
      if (starRating) hotels = hotels.filter(h => h.starRating === Number(starRating));
      return res.json({ success: true, count: hotels.length, hotels });
    }

    let filter = {};
    if (destination) filter.destinationSlug = destination;
    if (search) filter.name = new RegExp(search, 'i');
    if (starRating) filter.starRating = Number(starRating);

    let hotels = await Hotel.find(filter);
    if (!hotels || hotels.length === 0) {
      hotels = seedData.hotels;
    }
    res.json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.json({ success: true, count: seedData.hotels.length, hotels: seedData.hotels });
  }
};

module.exports = { getHotels };
