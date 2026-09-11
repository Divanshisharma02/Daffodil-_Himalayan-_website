// Gallery controller handles public explorer photo uploads & comments
const fs = require('fs');
const path = require('path');

const defaultGalleryPhotos = [
  {
    _id: 'photo_init_1',
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Captain Vikram Malhotra',
    caption: 'Dal Lake Shikara morning reflections in Srinagar, Kashmir',
    comments: [
      { uploaderName: 'Aarav Sharma', text: 'Stunning serenity on the waters!', createdAt: new Date() }
    ],
    createdAt: new Date('2026-08-15')
  },
  {
    _id: 'photo_init_2',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Dr. Rohini Sen',
    caption: 'Golden sunrise across the Solang Valley snow peaks in Manali',
    comments: [],
    createdAt: new Date('2026-08-20')
  },
  {
    _id: 'photo_init_3',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Devansh Kapoor',
    caption: 'Majestic sacred temple architecture at Kedarnath Dham',
    comments: [
      { uploaderName: 'Pooja Nair', text: 'Jai Bholenath! Truly divine darshan.', createdAt: new Date() }
    ],
    createdAt: new Date('2026-08-25')
  },
  {
    _id: 'photo_init_4',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Ananya Deshmukh',
    caption: 'Taj Mahal marble dome glistening under early morning sunrise',
    comments: [],
    createdAt: new Date('2026-09-01')
  },
  {
    _id: 'photo_init_5',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Kabir & Rhea',
    caption: 'Turquoise lagoons and overwater villas in the Maldives',
    comments: [],
    createdAt: new Date('2026-09-03')
  },
  {
    _id: 'photo_init_6',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    uploaderName: 'Siddharth Varma',
    caption: 'Royal heritage courtyards of Rajasthan luxury palace resort',
    comments: [],
    createdAt: new Date('2026-09-05')
  }
];

// In-Memory storage for uploaded gallery photos
let galleryPhotos = [...defaultGalleryPhotos];

const getGalleryPhotos = async (req, res) => {
  try {
    res.json({ success: true, count: galleryPhotos.length, photos: galleryPhotos });
  } catch (err) {
    res.json({ success: true, count: defaultGalleryPhotos.length, photos: defaultGalleryPhotos });
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

      const host = req.get('host') || 'daffodil-himalayan-website.onrender.com';
      const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      imageUrl = `${protocol}://${host}/uploads/${filename}`;
    } catch (writeErr) {
      // If disk write fails or ephemeral, keep the data URI as image source
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
