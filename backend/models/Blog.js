const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: 'Daffodil Expedition Team' },
  category: { type: String, required: true },
  coverImage: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  readTimeMinutes: { type: Number, default: 6 },
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
