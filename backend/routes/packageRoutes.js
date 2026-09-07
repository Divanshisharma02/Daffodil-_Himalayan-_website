const express = require('express');
const router = express.Router();
const { getPackages, getPackageBySlug } = require('../controllers/packageController');

router.get('/', getPackages);
router.get('/:slug', getPackageBySlug);

module.exports = router;
