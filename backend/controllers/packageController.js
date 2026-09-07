const Package = require('../models/Package');
const seedData = require('../scripts/mockData');
const { getDBStatus } = require('../config/db');

const getPackages = async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, search, isBestSeller, isAdventure, isTempleTour, isHeritage, isLuxury } = req.query;

    if (!getDBStatus()) {
      let packages = seedData.packages.filter(p => {
        if (destination && !p.destination.toLowerCase().includes(destination.toLowerCase())) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (isAdventure === 'true' && !p.badges.isAdventure) return false;
        if (isTempleTour === 'true' && !p.badges.isTempleTour) return false;
        if (isHeritage === 'true' && !p.badges.isHeritage) return false;
        return true;
      });
      return res.json({ success: true, count: packages.length, packages });
    }
    
    let filter = {};
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (search) filter.title = new RegExp(search, 'i');
    if (category) filter.country = new RegExp(category, 'i');
    if (minPrice || maxPrice) {
      filter.priceINR = {};
      if (minPrice) filter.priceINR.$gte = Number(minPrice);
      if (maxPrice) filter.priceINR.$lte = Number(maxPrice);
    }
    if (isBestSeller === 'true') filter['badges.isBestSeller'] = true;
    if (isAdventure === 'true') filter['badges.isAdventure'] = true;
    if (isTempleTour === 'true') filter['badges.isTempleTour'] = true;
    if (isHeritage === 'true') filter['badges.isHeritage'] = true;
    if (isLuxury === 'true') filter['badges.isLuxury'] = true;

    let packages = await Package.find(filter).sort({ rating: -1 });
    
    if (!packages || packages.length === 0) {
      packages = seedData.packages.filter(p => {
        if (destination && !p.destination.toLowerCase().includes(destination.toLowerCase())) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (isAdventure === 'true' && !p.badges.isAdventure) return false;
        if (isTempleTour === 'true' && !p.badges.isTempleTour) return false;
        if (isHeritage === 'true' && !p.badges.isHeritage) return false;
        return true;
      });
    }

    res.json({ success: true, count: packages.length, packages });
  } catch (error) {
    res.json({ success: true, packages: seedData.packages });
  }
};

const getPackageBySlug = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const fallback = seedData.packages.find(p => p.slug === req.params.slug) || seedData.packages[0];
      return res.json({ success: true, package: fallback });
    }

    const pkg = await Package.findOne({ slug: req.params.slug });
    if (pkg) {
      return res.json({ success: true, package: pkg });
    }
    
    const fallback = seedData.packages.find(p => p.slug === req.params.slug) || seedData.packages[0];
    res.json({ success: true, package: fallback });
  } catch (error) {
    const fallback = seedData.packages.find(p => p.slug === req.params.slug) || seedData.packages[0];
    res.json({ success: true, package: fallback });
  }
};

module.exports = { getPackages, getPackageBySlug };
