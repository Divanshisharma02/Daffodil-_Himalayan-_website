const seedData = require('../scripts/mockData');

const getHotels = async (req, res) => {
  try {
    const { destination, search, starRating } = req.query;
    let hotels = seedData.hotels;

    if (destination) {
      hotels = hotels.filter(h => h.destinationSlug === destination);
    }
    if (search) {
      hotels = hotels.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (starRating) {
      hotels = hotels.filter(h => h.starRating === Number(starRating));
    }

    res.json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.json({ success: true, count: seedData.hotels.length, hotels: seedData.hotels });
  }
};

module.exports = { getHotels };
