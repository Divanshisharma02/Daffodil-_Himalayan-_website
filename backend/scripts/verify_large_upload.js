const fs = require('fs');
const path = require('path');

async function testLargeUpload() {
  console.log('--- Starting Large Photo Upload Test (50MB - 60MB payload) ---');

  // Create a 40MB binary buffer (encodes to ~54MB Base64 string)
  const sizeInBytes = 40 * 1024 * 1024;
  console.log(`Generating simulated ${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB high-res photo buffer...`);
  
  const buffer = Buffer.alloc(sizeInBytes);
  // Fill with dummy JPEG-like byte pattern
  buffer.fill(0xff, 0, 100);
  buffer.fill(0xd8, 1, 2);

  const base64Data = 'data:image/jpeg;base64,' + buffer.toString('base64');
  console.log(`Base64 payload size: ${(base64Data.length / (1024 * 1024)).toFixed(1)} MB`);

  const payload = {
    image: base64Data,
    uploaderName: 'High Res Explorer',
    caption: 'Kinnaur Kailash Sunrise captured with 100MP Medium Format Camera'
  };

  const startTime = Date.now();
  console.log('Sending POST to http://localhost:5000/api/gallery/upload ...');

  try {
    const res = await fetch('http://localhost:5000/api/gallery/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Response Status: ${res.status} (took ${elapsed}s)`);

    const data = await res.json();
    console.log('Response Body:', data);

    if (res.status === 201 && data.success) {
      console.log('SUCCESS: Large photo upload verified!');
      if (data.photo && data.photo.imageUrl) {
        const localPath = path.join(__dirname, '../../frontend', data.photo.imageUrl);
        if (fs.existsSync(localPath)) {
          const stats = fs.statSync(localPath);
          console.log(`Verified saved file on disk: ${localPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
        }
      }
    } else {
      console.error('FAILED: Unexpected response:', data);
    }
  } catch (err) {
    console.error('ERROR during large upload test:', err.message);
  }
}

testLargeUpload();
