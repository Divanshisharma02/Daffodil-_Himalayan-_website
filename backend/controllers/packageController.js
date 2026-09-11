const seedData = require('../scripts/mockData');

const getPackages = async (req, res) => {
  try {
    const { destination, category, minPrice, maxPrice, search, isBestSeller, isAdventure, isTempleTour, isHeritage, isLuxury } = req.query;

    let packages = seedData.packages.filter(p => {
      if (destination && !p.destination.toLowerCase().includes(destination.toLowerCase())) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (isAdventure === 'true' && !p.badges.isAdventure) return false;
      if (isTempleTour === 'true' && !p.badges.isTempleTour) return false;
      if (isHeritage === 'true' && !p.badges.isHeritage) return false;
      if (isLuxury === 'true' && !p.badges.isLuxury) return false;
      if (isBestSeller === 'true' && !p.badges.isBestSeller) return false;
      if (minPrice && p.priceINR < Number(minPrice)) return false;
      if (maxPrice && p.priceINR > Number(maxPrice)) return false;
      return true;
    });

    res.json({ success: true, count: packages.length, packages });
  } catch (error) {
    res.json({ success: true, count: seedData.packages.length, packages: seedData.packages });
  }
};

const getPackageBySlug = async (req, res) => {
  try {
    const pkg = seedData.packages.find(p => p.slug === req.params.slug) || seedData.packages[0];
    res.json({ success: true, package: pkg });
  } catch (error) {
    const fallback = seedData.packages[0];
    res.json({ success: true, package: fallback });
  }
};

module.exports = { getPackages, getPackageBySlug };
