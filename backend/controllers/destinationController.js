const Destination = require('../models/Destination');
const seedData = require('../scripts/mockData');
const { getDBStatus } = require('../config/db');

const getDestinations = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (!getDBStatus()) {
      let dests = seedData.destinations;
      if (category) dests = dests.filter(d => d.category === category);
      if (search) dests = dests.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
      return res.json({ success: true, count: dests.length, destinations: dests });
    }

    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = new RegExp(search, 'i');

    let destinations = await Destination.find(filter);
    if (!destinations || destinations.length === 0) {
      destinations = seedData.destinations;
    }

    res.json({ success: true, count: destinations.length, destinations });
  } catch (error) {
    res.json({ success: true, count: seedData.destinations.length, destinations: seedData.destinations });
  }
};

const getDestinationBySlug = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const fallback = seedData.destinations.find(d => d.slug === req.params.slug) || seedData.destinations[0];
      return res.json({ success: true, destination: fallback });
    }

    const dest = await Destination.findOne({ slug: req.params.slug });
    if (dest) return res.json({ success: true, destination: dest });

    const fallback = seedData.destinations.find(d => d.slug === req.params.slug) || seedData.destinations[0];
    res.json({ success: true, destination: fallback });
  } catch (error) {
    const fallback = seedData.destinations.find(d => d.slug === req.params.slug) || seedData.destinations[0];
    res.json({ success: true, destination: fallback });
  }
};

module.exports = { getDestinations, getDestinationBySlug };
