// Interactive Book Reader Module for Daffodil Himalayan Stories

const blogStories = [
  {
    id: "kashmir-adventure",
    title: "The Great Kashmir Adventure: Houseboats, Kahwa & One Very Confused Gondola",
    badge: "Expedition Story",
    badgeClass: "bg-success",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover secret Kahwa tea spots, local saffron markets, and a hilarious first-hand account of Gulmarg gondolas and skiing.",
    pages: [
      {
        pageNumber: 1,
        title: "Prologue: The Three Missions",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 1 • Prologue</span>
            <h3 class="font-serif text-success mt-2">The Three Missions in Srinagar</h3>
          </div>
          <p class="lead">The moment I reached Srinagar, I knew this was not going to be an ordinary trip. The mountains looked like they had been painted by someone who had an unlimited supply of blue and green, the Dal Lake was sparkling in the sunlight, and the air smelled faintly of flowers, spices, and… adventure.</p>
          <p>My first mission was simple: <strong>find a houseboat.</strong></p>
          <p>My second mission was even simpler: <strong>find Kahwa tea.</strong></p>
          <p>My third mission was to avoid embarrassing myself in front of the locals.</p>
          <p class="fst-italic text-danger border-start border-3 border-danger ps-3 py-1 my-3">I failed at the third mission within approximately fifteen minutes.</p>
        `
      },
      {
        pageNumber: 2,
        title: "Chapter 1: The Houseboat Disaster",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 2 • Chapter 1</span>
            <h3 class="font-serif text-success mt-2">The Houseboat Disaster</h3>
          </div>
          <p>I stepped onto a beautiful houseboat floating peacefully on Dal Lake. It looked like a luxury hotel had decided to become a boat. There were wooden carvings, comfortable rooms, colourful carpets, and a view so beautiful that I immediately forgot how much luggage I was carrying.</p>
          <p>The owner welcomed me warmly and offered me a cup of Kahwa.</p>
          <p>I took one sip. I froze.</p>
          <p>This wasn't ordinary tea. It was warm, fragrant, slightly sweet, and filled with the taste of saffron and spices. I suddenly understood why people come to Kashmir and then spend half their trip asking, <em>“Where can I get more Kahwa?”</em></p>
          <p>Naturally, I asked the owner where the best Kahwa was. He smiled and said, <strong>“Everywhere.”</strong> That answer was dangerous.</p>
          <p>Because now I had a new goal: <strong>find the secret Kahwa spots of Srinagar.</strong></p>
          <p>I spent the next few hours wandering through little cafés and local corners, drinking Kahwa like I was training for the Kashmir Tea Olympics.</p>
          <p class="text-muted">By evening, I was so full of tea that I was convinced I could hear the mountains talking.</p>
        `
      },
      {
        pageNumber: 3,
        title: "Chapter 2: The Secret Saffron Mission",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 3 • Chapter 2</span>
            <h3 class="font-serif text-success mt-2">The Secret Saffron Mission</h3>
          </div>
          <p>The next morning, I decided to search for authentic Kashmiri saffron.</p>
          <p>I entered a local market and immediately became suspicious. Every shopkeeper seemed to know exactly what I wanted before I even said it.</p>
          <div class="bg-light p-3 rounded-3 border border-warning my-3">
            <p class="m-0">“Original saffron?” one asked.</p>
            <p class="m-0">“Yes!”</p>
            <p class="m-0">“Pure Kashmiri?”</p>
            <p class="m-0">“Yes!”</p>
            <p class="m-0">“Very good quality?”</p>
            <p class="m-0">“Yes!”</p>
          </div>
          <p>At this point I felt like I was taking an exam I hadn't studied for.</p>
          <p>The saffron threads were tiny, delicate, and incredibly fragrant. I carefully bought some, imagining myself returning home as an expert Kashmiri spice trader.</p>
          <p>Then I realized something: I had absolutely no idea how to tell good saffron from bad saffron. So I simply trusted the shopkeeper and hoped for the best.</p>
          <div class="p-2 bg-dark text-warning text-center rounded my-3">
            <strong>Mission: Saffron Expert. Status: Still loading.</strong>
          </div>
        `
      },
      {
        pageNumber: 4,
        title: "Chapter 3: Gulmarg Gondola",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 4 • Chapter 3</span>
            <h3 class="font-serif text-success mt-2">Gulmarg: Where My Confidence Went to Die</h3>
          </div>
          <p>After Srinagar, it was time for Gulmarg. I had heard about the famous <strong>Gulmarg Gondola</strong>, one of the world's highest cable cars. I was excited. Very excited. Maybe too excited.</p>
          <p>As the gondola began climbing, the town slowly disappeared below us. Pine forests covered the mountains, the air became colder, and the view became more spectacular with every metre.</p>
          <p>I pressed my face against the window like a child seeing mountains for the first time.</p>
          <p>Then I looked down. Big mistake.</p>
          <p class="fst-italic text-danger">Suddenly my brain whispered: “You are currently sitting in a small box hanging from a cable above a mountain.”</p>
          <p>I looked up immediately. “Nope,” I told myself. “Beautiful view. Don't think about it.”</p>
          <p>The gondola continued climbing.</p>
        `
      },
      {
        pageNumber: 5,
        title: "Chapter 4: The Skiing Plan",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 5 • Chapter 4</span>
            <h3 class="font-serif text-success mt-2">The Skiing Plan & Mountain Adventure</h3>
          </div>
          <p>At Gulmarg, I decided that I was going to become a professional skier. I had watched skiing videos. I had confidence. I had absolutely no skiing skills.</p>
          <p>But apparently confidence is very powerful—until you stand on snow.</p>
          <p>The moment I put on the skis, my legs decided they had never met each other before. I moved approximately two metres before losing control. I didn't exactly ski down the slope. I negotiated with gravity. <strong>Gravity won.</strong></p>
          <p>I landed in the snow and looked up at the mountains. A group of experienced skiers passed me smoothly, gracefully, and effortlessly. I smiled politely. Inside, I was thinking:</p>
          <p class="bg-light p-2 border-start border-3 border-success fst-italic">“I belong in the beginner section. The extremely beginner section. Possibly the section for people who have never seen snow.”</p>
          <p>Despite my skiing disaster, Gulmarg was incredible. The snow-covered mountains seemed endless. The cold wind hit my face, but instead of complaining, I just laughed.</p>
          <p>By afternoon, my gloves were wet, my shoes were full of snow, and my dignity had disappeared somewhere halfway down the slope. But I was happy.</p>
        `
      },
      {
        pageNumber: 6,
        title: "Epilogue: Back to the Houseboat",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 6 • Epilogue</span>
            <h3 class="font-serif text-success mt-2">Back to the Houseboat & Final Rule</h3>
          </div>
          <p>That evening, I returned to Srinagar and climbed back onto my houseboat. I was exhausted. I sat quietly on the deck while Dal Lake reflected the evening sky. The mountains stood in the distance, and the water moved gently around the boat.</p>
          <p>Then someone brought me another cup of Kahwa. I took a sip and smiled. Suddenly, the entire adventure made sense.</p>
          <p>The houseboats, the mysterious saffron markets, the endless cups of Kahwa, the terrifying gondola, and my unsuccessful skiing career had all become part of one unforgettable story.</p>
          <p>I had come to Kashmir looking for adventure. I found it. I also found saffron. I found Kahwa. I found mountains. And most importantly, I discovered that <strong>I should probably never become a professional skier.</strong></p>
          <div class="p-3 bg-dark text-white rounded-3 border border-warning text-center my-3">
            <h5 class="font-serif text-warning m-0">Golden Kashmir Travel Rule</h5>
            <p class="small text-light m-0 mt-1">“When in Kashmir, always say yes to adventure—but maybe say no to skiing until you actually know how to stop.”</p>
          </div>
        `
      }
    ]
  },
  {
    id: "kedarnath-adventure",
    title: "The Great Kedarnath Adventure: Mountains, Mist & My Battle With My Backpack",
    badge: "Pilgrimage Journal",
    badgeClass: "bg-warning text-dark",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    excerpt: "An authentic, humorous pilgrimage tale of packing for the Himalayas, trekking 16 km from Gaurikund, and standing before Kedarnath.",
    pages: [
      {
        pageNumber: 1,
        title: "Prologue: Battle With My Backpack",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 1 • Prologue</span>
            <h3 class="font-serif text-primary mt-2">Battle With My Backpack</h3>
          </div>
          <p class="lead">I thought going on the Kedarnath and Char Dham Yatra would be a peaceful spiritual journey. A little walking. A little praying. Some beautiful mountain views. Maybe some peaceful moments where I would stand dramatically against the Himalayas and take a perfect photograph.</p>
          <p class="text-danger fw-bold">I was wrong. Very, very wrong.</p>
          <p>My adventure began the night before the journey when I started packing. I had one backpack. Somehow, after packing clothes, a jacket, rainwear, gloves, socks, medicines, water, snacks, toiletries, a power bank and approximately seventeen things I probably didn't need, my backpack looked like it was preparing for its own pilgrimage.</p>
          <p>I lifted it. My shoulder immediately said: <strong>“We need to discuss this.”</strong></p>
        `
      },
      {
        pageNumber: 2,
        title: "Chapter 1: Weather & The Journey",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 2 • Chapter 1</span>
            <h3 class="font-serif text-primary mt-2">Respect the Weather & The Journey Begins</h3>
          </div>
          <h5 class="font-serif text-success"><i class="fas fa-cloud-sun-rain me-2"></i> Rule Number One: Respect the Weather</h5>
          <p>The mountains have their own personality. One minute the sky can look bright and beautiful. The next minute clouds can appear as if someone has switched off the sunlight.</p>
          <p>So I packed layers instead of relying on one giant jacket. Warm clothes, a waterproof outer layer, comfortable walking shoes, extra socks and rain protection became my travelling army. I also kept essential medicines and personal items where I could reach them easily.</p>
          <p class="text-muted">My bag was now heavier than my expectations. But at least I was prepared. Probably.</p>
          <hr>
          <h5 class="font-serif text-success"><i class="fas fa-road me-2"></i> The Journey Begins</h5>
          <p>The road toward the mountains was beautiful. Rivers rushed beside the roads, waterfalls appeared between the cliffs, and the Himalayan landscape seemed to get more impressive every hour.</p>
          <p>I spent the first few hours taking photographs. Then more photographs. Then photographs of the photographs. My phone battery started looking nervous.</p>
          <p>Eventually, I realized something important: <strong>The mountains were not impressed by my camera skills.</strong> They simply continued being beautiful.</p>
          <small class="text-muted d-block bg-light p-2 border rounded">Note: The Char Dham Yatra traditionally includes Yamunotri, Gangotri, Kedarnath and Badrinath, involving high-altitude travel.</small>
        `
      },
      {
        pageNumber: 3,
        title: "Chapter 2: Altitude & The 16km Trek",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 3 • Chapter 2</span>
            <h3 class="font-serif text-primary mt-2">Altitude: The Invisible Villain & The Trek</h3>
          </div>
          <h5 class="font-serif text-danger"><i class="fas fa-mountain me-2"></i> Altitude: The Invisible Villain</h5>
          <p>As we climbed higher, I began to understand that the mountains were not just about beautiful scenery. The air felt different. Walking quickly suddenly seemed like an Olympic sport.</p>
          <p>So instead of trying to walk like a superhero, I slowed down, took regular breaks, drank water and allowed myself time to adjust.</p>
          <p>My friends were walking ahead. I was behind them. Very behind them. One friend shouted: “Come on!” I shouted back: <strong>“I AM COMING!”</strong> I was technically telling the truth. I was coming. Just at the speed of a sleepy mountain goat.</p>
          <hr>
          <h5 class="font-serif text-success"><i class="fas fa-hiking me-2"></i> The Kedarnath Trek</h5>
          <p>Eventually came the big challenge: the 16 km trek from Gaurikund toward Kedarnath. The trail stretched ahead through the mountains with ponies and walkers.</p>
          <div class="bg-light p-3 border-start border-4 border-warning my-2">
            <p class="m-0">At the beginning: <strong>“Easy!”</strong></p>
            <p class="m-0">30 mins later: <strong>“Who designed this mountain?”</strong></p>
            <p class="m-0">1 hour later: <strong>“I respect mountains now.”</strong></p>
            <p class="m-0">2 hours later: <strong>“I respect everyone who has ever climbed a staircase.”</strong></p>
          </div>
        `
      },
      {
        pageNumber: 4,
        title: "Chapter 3: Snacks & Helicopter",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 4 • Chapter 3</span>
            <h3 class="font-serif text-primary mt-2">Snack Emergency & The Helicopter Idea</h3>
          </div>
          <h5 class="font-serif text-warning text-dark"><i class="fas fa-cookie-bite me-2"></i> Snack Emergency</h5>
          <p>Luckily, I had packed snacks. This was one of the best decisions of my life. Every time my energy dropped, I opened my bag and discovered something edible: Biscuits, Dry fruits, Chocolate, More biscuits.</p>
          <p>At one point, my backpack had become less of a travel bag and more of a mobile grocery store. Every few kilometres, my brain would whisper: <strong>“Keep walking. There might be chocolate.”</strong></p>
          <hr>
          <h5 class="font-serif text-primary"><i class="fas fa-helicopter me-2"></i> The Helicopter Idea</h5>
          <p>Before the trip, I had also heard about helicopter services to Kedarnath. The idea sounded extremely attractive: Why walk for hours when you can simply fly over the mountains?</p>
          <p>My brain immediately said: <strong>“HELICOPTER.”</strong></p>
          <p>Of course, helicopter travel requires proper advance planning through official channels. Weather can also affect flight operations.</p>
          <p class="fst-italic">If the weather says: “Not today.” The helicopter says: “Not today.” And your travel plan has to accept it.</p>
        `
      },
      {
        pageNumber: 5,
        title: "Chapter 4: Kedarnath Appears",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 5 • Chapter 4</span>
            <h3 class="font-serif text-primary mt-2">The Final Climb & Kedarnath Appears</h3>
          </div>
          <p>As we continued toward Kedarnath, the scenery became more dramatic. The sound of rivers echoed through the valleys. Snow-covered peaks appeared in the distance. Clouds floated around the mountains.</p>
          <p>And slowly, the exhaustion began to disappear. I could see the excitement on everyone's faces. Nobody was complaining anymore. Well… Almost nobody. I may have complained about my shoes, backpack, slope, and gravity!</p>
          <hr>
          <h5 class="font-serif text-success"><i class="fas fa-gopuram me-2"></i> Kedarnath Appears</h5>
          <p>Then suddenly, after hours of walking, Kedarnath appeared before us. The temple stood surrounded by enormous Himalayan peaks (at 3,580 metres above sea level).</p>
          <p>For a moment, I forgot about my tired legs. I forgot about my heavy backpack. I forgot about the snacks. I simply stood there and looked.</p>
          <p>The atmosphere was peaceful and powerful at the same time. The journey wasn't only about reaching the destination. The walking, the cold, the mountain air, the tiredness, the laughter—all of it had become part of the experience.</p>
        `
      },
      {
        pageNumber: 6,
        title: "Epilogue: Travel Lessons",
        content: `
          <div class="story-chapter-header text-center mb-4">
            <span class="badge bg-gold text-dark px-3 py-1 text-uppercase">Page 6 • Epilogue</span>
            <h3 class="font-serif text-primary mt-2">The Return Journey & Golden Lessons</h3>
          </div>
          <p>On the way back, I felt like a completely different person. At the beginning: excited, nervous, exhausted, hungry, extremely hungry, spiritual... and finally, VERY HAPPY.</p>
          <div class="p-3 bg-white border border-warning rounded-3 shadow-sm my-3">
            <h6 class="font-serif text-success mb-2"><i class="fas fa-lightbulb text-warning me-2"></i> Mountain Travel Lessons:</h6>
            <ul class="small mb-0 ps-3">
              <li>Pack for changing weather.</li>
              <li>Take altitude seriously.</li>
              <li>Drink water and take breaks.</li>
              <li>Keep travel documents safe.</li>
              <li>Plan helicopter travel early & stay flexible.</li>
              <li><strong>Never say “This trek will be easy” before you see the mountain.</strong></li>
            </ul>
          </div>
          <p>I had come to Kedarnath looking for a spiritual adventure. I found mountains, memories, laughter, tired legs, and a backpack that had somehow become my greatest enemy. And honestly? <strong>I wouldn't change a thing.</strong></p>
        `
      }
    ]
  }
];

let currentStory = null;
let currentPageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderBlogCards();
  initBookReaderModal();
  initCommunityGallery();
});

function renderBlogCards() {
  const container = document.getElementById('blogGrid');
  if (!container) return;

  container.innerHTML = blogStories.map(story => `
    <div class="col-md-6 col-lg-6">
      <div class="luxury-card h-100">
        <div class="card-img-wrapper" style="height: 250px;">
          <img src="${story.image}" alt="${story.title}" style="object-fit: cover; width: 100%; height: 100%;">
          <div class="card-badge-container">
            <span class="badge ${story.badgeClass}">${story.badge}</span>
            <span class="badge bg-dark text-warning"><i class="fas fa-book-open me-1"></i> Interactive Book Reader</span>
          </div>
        </div>
        <div class="card-body-content d-flex flex-column justify-content-between p-4">
          <div>
            <h3 class="card-title font-serif h4 text-success mb-2">${story.title}</h3>
            <p class="small text-muted mb-3">${story.excerpt}</p>
          </div>
          <div class="pt-3 border-top d-flex justify-content-between align-items-center">
            <span class="small text-muted"><i class="fas fa-file-alt me-1 text-warning"></i> 6 Book Pages</span>
            <button type="button" class="btn btn-gold btn-sm px-3 fw-bold open-book-btn" data-story-id="${story.id}">
              <i class="fas fa-book-reader me-1"></i> Read Story (Book)
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Attach click events
  document.querySelectorAll('.open-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const storyId = e.currentTarget.getAttribute('data-story-id');
      openBook(storyId);
    });
  });
}

function initBookReaderModal() {
  const modalEl = document.getElementById('bookReaderModal');
  if (!modalEl) return;

  const prevBtn = document.getElementById('bookPrevBtn');
  const nextBtn = document.getElementById('bookNextBtn');

  prevBtn?.addEventListener('click', () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      updateBookPage();
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (currentStory && currentPageIndex < currentStory.pages.length - 1) {
      currentPageIndex++;
      updateBookPage();
    } else {
      const bsModal = bootstrap.Modal.getInstance(document.getElementById('bookReaderModal'));
      bsModal?.hide();
    }
  });
}

function openBook(storyId) {
  currentStory = blogStories.find(s => s.id === storyId);
  if (!currentStory) return;

  currentPageIndex = 0;
  updateBookPage();

  const modalEl = document.getElementById('bookReaderModal');
  if (modalEl) {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }
}

function updateBookPage() {
  if (!currentStory) return;

  const totalPages = currentStory.pages.length;
  const pageData = currentStory.pages[currentPageIndex];

  document.getElementById('bookModalTitle').textContent = currentStory.title;
  document.getElementById('bookPageCounter').textContent = `Page ${pageData.pageNumber} of ${totalPages}`;
  
  const contentArea = document.getElementById('bookPageContent');
  if (contentArea) {
    contentArea.style.opacity = '0';
    setTimeout(() => {
      contentArea.innerHTML = pageData.content;
      contentArea.style.opacity = '1';
    }, 150);
  }

  // Update Buttons
  const prevBtn = document.getElementById('bookPrevBtn');
  const nextBtn = document.getElementById('bookNextBtn');

  if (prevBtn) {
    prevBtn.disabled = (currentPageIndex === 0);
  }

  if (nextBtn) {
    if (currentPageIndex === totalPages - 1) {
      nextBtn.innerHTML = 'Finish Reading <i class="fas fa-check-circle ms-1"></i>';
      nextBtn.className = 'btn btn-success px-4 py-2 fw-bold text-uppercase';
    } else {
      nextBtn.innerHTML = 'Next Page <i class="fas fa-arrow-right ms-1"></i>';
      nextBtn.className = 'btn btn-gold px-4 py-2 fw-bold text-uppercase';
    }
  }
}

// Helper to optimize large (50MB - 100MB+) photos to 4K Ultra-HD before upload with raw fallback
function prepareImagePayload(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = () => {
      const rawDataUrl = reader.result;

      // If file is already reasonably sized (< 4MB) or not a standard browser-decodable image, upload raw
      if (file.size <= 4 * 1024 * 1024 || !file.type.startsWith('image/')) {
        return resolve(rawDataUrl);
      }

      if (onProgress) onProgress('Optimizing high-res image...');

      const img = new Image();
      img.onerror = () => {
        // Fallback to sending raw base64 directly
        resolve(rawDataUrl);
      };
      img.onload = () => {
        try {
          const maxDim = 3840; // 4K Ultra-HD resolution limit
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // High-fidelity JPEG compression (quality 0.92)
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          resolve(optimizedDataUrl);
        } catch (e) {
          console.warn('Canvas optimization fallback to raw:', e);
          resolve(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

// COMMUNITY PUBLIC GALLERY INTEGRATION
async function initCommunityGallery() {
  const uploadForm = document.getElementById('galleryUploadForm');
  const fileInput = document.getElementById('galleryFile');
  const sizeNotice = document.getElementById('galleryFileSizeNotice');

  // Display file size when selected
  fileInput?.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      const mb = (f.size / (1024 * 1024)).toFixed(1);
      if (sizeNotice) {
        sizeNotice.innerHTML = `<span class="text-success fw-bold"><i class="fas fa-check-circle me-1"></i> Selected: ${f.name} (${mb} MB) - Ready to upload!</span>`;
      }
    }
  });

  // Fetch and display photos initially
  await fetchGalleryPhotos();

  // Handle new file upload
  uploadForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uploaderName = document.getElementById('galleryUploader').value.trim();
    const caption = document.getElementById('galleryCaption').value.trim();
    const file = fileInput.files[0];

    if (!file) return;

    const btn = document.getElementById('galleryUploadBtn');
    const originalText = btn.innerHTML;
    const mb = (file.size / (1024 * 1024)).toFixed(1);

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Uploading Photo (${mb} MB)... Please wait`;

    try {
      const base64Image = await prepareImagePayload(file, (msg) => {
        btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> ${msg}`;
      });

      btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Saving to Gallery...`;

      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          uploaderName,
          caption
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Expedition photo uploaded successfully to the community gallery!');
        uploadForm.reset();
        if (sizeNotice) {
          sizeNotice.innerHTML = 'Supports all high-resolution photos (including 50 MB, 100 MB+ camera photos).';
        }
        await fetchGalleryPhotos(); // Reload gallery to show new photo
      } else {
        alert('Error: ' + (data.message || 'Upload failed.'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}

async function fetchGalleryPhotos() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  try {
    const res = await fetch('/api/gallery');
    const data = await res.json();

    if (data.success && data.photos) {
      renderGalleryGrid(data.photos);
    }
  } catch (err) {
    console.error('Error fetching gallery photos:', err);
  }
}

function renderGalleryGrid(photos) {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  if (photos.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted my-5"><p><i class="fas fa-image fa-3x mb-3 text-warning"></i><br>No photos uploaded yet. Be the first to share an explorer memory!</p></div>`;
    return;
  }

  container.innerHTML = photos.map(p => {
    const commentsListHTML = p.comments && p.comments.length > 0 
      ? p.comments.map(c => `
          <div class="mb-1 p-2 bg-light rounded text-dark" style="font-size: 0.82rem; border-left: 3px solid #d4af37;">
            <strong>${c.uploaderName}:</strong> <span>${c.text}</span>
          </div>
        `).join('')
      : `<p class="small text-muted mb-2" style="font-size: 0.8rem;">No comments yet. Write one below!</p>`;

    return `
      <div class="col-md-6 col-lg-4">
        <div class="luxury-card h-100 border border-gold" style="border-radius: 12px; overflow: hidden; background: #fff;">
          <div class="card-img-wrapper" style="height: 240px; overflow: hidden; position: relative;">
            <img src="${p.imageUrl}" alt="Explorer Memory" style="object-fit: cover; width: 100%; height: 100%;" onerror="this.src='images/himachal.jpg'">
            <div class="card-badge-container">
              <span class="badge bg-gold text-dark"><i class="fas fa-map-marker-alt me-1"></i> Public Photo</span>
            </div>
          </div>
          <div class="card-body-content p-3 d-flex flex-column justify-content-between" style="min-height: 250px;">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <strong class="text-success" style="font-size: 0.88rem;"><i class="fas fa-user-astronaut me-1"></i> ${p.uploaderName}</strong>
                <small class="text-muted" style="font-size: 0.72rem;">${new Date(p.createdAt).toLocaleDateString()}</small>
              </div>
              <p class="small text-dark mb-3 fw-semibold border-start border-3 border-gold ps-2" style="font-style: italic;">"${p.caption}"</p>
              
              <!-- Comment Section -->
              <div class="comment-section-wrapper pt-2">
                <h6 class="font-serif text-success mb-2" style="font-size: 0.85rem; font-weight: bold;"><i class="fas fa-comments me-1 text-warning"></i> Explorer Comments</h6>
                <div class="comment-list px-1 mb-2" style="max-height: 100px; overflow-y: auto;">
                  ${commentsListHTML}
                </div>
              </div>
            </div>

            <!-- Comment Form -->
            <form class="gallery-comment-form mt-2 border-top pt-2" data-photo-id="${p._id}">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control comment-author-input" placeholder="Your Name" style="max-width: 90px;" required>
                <input type="text" class="form-control comment-text-input" placeholder="Add a comment..." required>
                <button class="btn btn-gold" type="submit" title="Post Comment"><i class="fas fa-paper-plane"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Bind Submit events to all comment forms
  document.querySelectorAll('.gallery-comment-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const photoId = form.getAttribute('data-photo-id');
      const authorInput = form.querySelector('.comment-author-input');
      const textInput = form.querySelector('.comment-text-input');
      
      const uploaderName = authorInput.value.trim();
      const text = textInput.value.trim();

      if (!uploaderName || !text) return;

      try {
        const res = await fetch(`/api/gallery/${photoId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uploaderName, text })
        });

        const data = await res.json();
        if (data.success) {
          textInput.value = '';
          await fetchGalleryPhotos(); // Reload gallery grid to show updated comments
        } else {
          alert('Error posting comment: ' + data.message);
        }
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    });
  });
}
