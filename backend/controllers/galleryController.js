// Gallery controller handles public explorer photo uploads & comments
const fs = require('fs');
const path = require('path');
const seedData = require('../scripts/mockData');

// In-Memory storage for uploaded gallery photos
let galleryPhotos = (seedData.gallery || []).map((img, idx) => ({
  _id: `photo_${idx + 1}`,
  imageUrl: typeof img === 'string' ? img : img.imageUrl,
  uploaderName: img.uploaderName || 'Daffodil Explorer',
  caption: img.caption || 'Himalayan Expedition',
  comments: img.comments || [],
  createdAt: new Date()
}));

const getGalleryPhotos = async (req, res) => {
  try {
    res.json({ success: true, count: galleryPhotos.length, photos: galleryPhotos });
  } catch (err) {
    res.json({ success: true, count: 0, photos: [] });
  }
};

const uploadGalleryPhoto = async (req, res) => {
  try {
    const { image, uploaderName, caption } = req.body;

    if (!image || !uploaderName || !caption) {
      return res.status(400).json({ success: false, message: 'Please provide uploader name, caption, and image file.' });
    }

    let imageUrl = image;

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
      const filename = `gallery_${Date.now()}_${Math.floor(Math.random() * 1000)}.${extension}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.promises.writeFile(filePath, imageBuffer);

      imageUrl = `/uploads/${filename}`;
    } catch (writeErr) {
      imageUrl = image;
    }

    const newPhoto = {
      _id: `photo_${Date.now()}`,
      imageUrl,
      uploaderName,
      caption,
      comments: [],
      createdAt: new Date()
    };

    galleryPhotos.unshift(newPhoto);
    res.status(201).json({ success: true, message: 'Photo uploaded successfully.', photo: newPhoto });
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

    const photo = galleryPhotos.find(p => p._id === photoId);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found.' });
    }

    const newComment = {
      uploaderName,
      text,
      createdAt: new Date()
    };

    photo.comments.push(newComment);
    res.json({ success: true, message: 'Comment added successfully.', photo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getGalleryPhotos,
  uploadGalleryPhoto,
  addGalleryComment
};
