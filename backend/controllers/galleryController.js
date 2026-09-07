// Gallery controller handles public explorer photo uploads & comments
const fs = require('fs');
const path = require('path');
const GalleryPhoto = require('../models/GalleryPhoto');
const { getDBStatus } = require('../config/db');

// In-Memory fallback storage for offline DB use
let mockGalleryPhotos = [];

const getGalleryPhotos = async (req, res) => {
  try {
    if (!getDBStatus()) {
      return res.json({ success: true, count: mockGalleryPhotos.length, photos: mockGalleryPhotos });
    }

    let photos = await GalleryPhoto.find().sort({ createdAt: -1 });
    if (!photos || photos.length === 0) {
      // Sync mock data to DB if empty
      return res.json({ success: true, count: mockGalleryPhotos.length, photos: mockGalleryPhotos });
    }

    res.json({ success: true, count: photos.length, photos });
  } catch (err) {
    res.json({ success: true, count: mockGalleryPhotos.length, photos: mockGalleryPhotos });
  }
};

const uploadGalleryPhoto = async (req, res) => {
  try {
    const { image, uploaderName, caption } = req.body;

    if (!image || !uploaderName || !caption) {
      return res.status(400).json({ success: false, message: 'Please provide uploader name, caption, and image file.' });
    }

    let imageUrl = '';
    let isBase64Fallback = false;

    // Process Base64 image upload safely without regex re-dos
    try {
      const uploadsDir = path.join(__dirname, '../../frontend/uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      let base64Data = image;
      let extension = 'jpg';

      if (typeof image === 'string' && image.startsWith('data:')) {
        const commaIdx = image.indexOf(',');
        if (commaIdx !== -1) {
          const meta = image.substring(0, commaIdx).toLowerCase();
          if (meta.includes('image/png')) extension = 'png';
          else if (meta.includes('image/webp')) extension = 'webp';
          else if (meta.includes('image/gif')) extension = 'gif';
          else if (meta.includes('image/jpeg') || meta.includes('image/jpg')) extension = 'jpg';
          
          base64Data = image.substring(commaIdx + 1);
        }
      }

      const imageBuffer = Buffer.from(base64Data, 'base64');
      const sizeMb = (imageBuffer.length / (1024 * 1024)).toFixed(2);

      const filename = `gallery_${Date.now()}_${Math.floor(Math.random() * 1000)}.${extension}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.promises.writeFile(filePath, imageBuffer);

      imageUrl = `/uploads/${filename}`;
      console.log(`[Gallery Upload] Successfully processed & saved ${extension.toUpperCase()} photo (${sizeMb} MB) by ${uploaderName}`);
    } catch (writeErr) {
      console.warn('[Gallery Upload warning] File write failed, falling back to database storage:', writeErr.message);
      imageUrl = image; // Use base64 data url directly
      isBase64Fallback = true;
    }

    const newPhotoData = {
      imageUrl,
      uploaderName,
      caption,
      comments: []
    };

    if (getDBStatus()) {
      const dbPhoto = await GalleryPhoto.create(newPhotoData);
      res.status(201).json({ success: true, message: 'Photo uploaded successfully.', photo: dbPhoto });
    } else {
      const mockPhoto = {
        _id: `mock_${Date.now()}`,
        ...newPhotoData,
        createdAt: new Date()
      };
      mockGalleryPhotos.unshift(mockPhoto);
      res.status(201).json({ success: true, message: 'Photo uploaded successfully (in-memory mode).', photo: mockPhoto });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addGalleryComment = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { uploaderName, text } = req.body;

    if (!uploaderName || !text) {
      return res.status(400).json({ success: false, message: 'Please provide uploader name and comment text.' });
    }

    const newComment = {
      uploaderName,
      text,
      createdAt: new Date()
    };

    if (getDBStatus() && !photoId.startsWith('mock_')) {
      const photo = await GalleryPhoto.findById(photoId);
      if (!photo) {
        return res.status(404).json({ success: false, message: 'Photo not found.' });
      }
      photo.comments.push(newComment);
      await photo.save();
      return res.json({ success: true, message: 'Comment added successfully.', photo });
    } else {
      // Find in-memory
      const photo = mockGalleryPhotos.find(p => p._id === photoId);
      if (!photo) {
        return res.status(404).json({ success: false, message: 'Photo not found.' });
      }
      photo.comments.push(newComment);
      return res.json({ success: true, message: 'Comment added successfully (in-memory mode).', photo });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getGalleryPhotos,
  uploadGalleryPhoto,
  addGalleryComment
};
