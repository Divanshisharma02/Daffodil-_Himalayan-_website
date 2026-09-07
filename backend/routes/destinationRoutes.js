const express = require('express');
const router = express.Router();
const { getDestinations, getDestinationBySlug } = require('../controllers/destinationController');

router.get('/', getDestinations);
router.get('/:slug', getDestinationBySlug);

module.exports = router;
