const seedData = require('../scripts/mockData');

const getDestinations = async (req, res) => {
  try {
    const { category, search } = req.query;
    let dests = seedData.destinations;

    if (category) {
      dests = dests.filter(d => d.category && d.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      dests = dests.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    }

    res.json({ success: true, count: dests.length, destinations: dests });
  } catch (error) {
    res.json({ success: true, count: seedData.destinations.length, destinations: seedData.destinations });
  }
};

const getDestinationBySlug = async (req, res) => {
  try {
    const dest = seedData.destinations.find(d => d.slug === req.params.slug) || seedData.destinations[0];
    res.json({ success: true, destination: dest });
  } catch (error) {
    const fallback = seedData.destinations[0];
    res.json({ success: true, destination: fallback });
  }
};

module.exports = { getDestinations, getDestinationBySlug };
