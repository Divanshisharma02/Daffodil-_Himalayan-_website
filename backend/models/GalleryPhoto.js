const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  uploaderName: { type: String, default: 'Explorer' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const galleryPhotoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploaderName: { type: String, required: true },
  caption: { type: String, required: true },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GalleryPhoto', galleryPhotoSchema);
