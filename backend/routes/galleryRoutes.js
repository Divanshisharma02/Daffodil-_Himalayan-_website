const express = require('express');
const router = express.Router();
const { getGalleryPhotos, uploadGalleryPhoto, addGalleryComment } = require('../controllers/galleryController');

router.get('/', getGalleryPhotos);
router.post('/upload', uploadGalleryPhoto);
router.post('/:photoId/comments', addGalleryComment);

module.exports = router;
