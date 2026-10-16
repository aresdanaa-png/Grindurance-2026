const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brainDir = 'C:\\Users\\ILHAM\\.gemini\\antigravity-ide\\brain\\7a93116e-b728-4981-a5af-96692859d106';
const outDir = 'c:\\Users\\ILHAM\\Downloads\\GRINDURANCE\\public\\categories';

async function cropZoom(inputPath, outputPath, zoomFactor, topBias = 0.5, leftBias = 0.5) {
  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  const cropW = Math.round(width / zoomFactor);
  const cropH = Math.round(height / zoomFactor);

  const maxLeft = width - cropW;
  const maxTop = height - cropH;

  const left = Math.round(maxLeft * leftBias);
  const top = Math.round(maxTop * topBias);

  console.log(`Cropping ${path.basename(outputPath)}: ${width}x${height} -> ${cropW}x${cropH} at (${left}, ${top})`);

  await sharp(inputPath)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(width, height, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(outputPath);
}

// Custom two-tone duotone converter for 120 Race
async function process120Race() {
  const inputPath = path.join(brainDir, 'cat_120_race_1792138834627.jpg');
  const outputPath = path.join(outDir, 'cat_120_race.jpg');

  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  // Zoom tightly into both cyclists racing forward together
  // Focus on riders 412 & 413 (lower-mid section)
  const cropW = Math.round(width * 0.78);
  const cropH = Math.round(height * 0.78);
  const left = Math.round((width - cropW) * 0.5);
  const top = Math.round((height - cropH) * 0.72); // slightly lower to keep bikes and sprint bodies

  const croppedBuffer = await sharp(inputPath)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(width, height)
    .toBuffer();

  const { data, info } = await sharp(croppedBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const outBuf = Buffer.alloc(numPixels * 3);

  // Duotone mapping to Grindurance Electric Orange (#FA6D0B) & Deep Carbon
  for (let i = 0; i < numPixels; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // S-curve contrast boost
    lum = Math.pow(lum, 1.45) * 1.35;
    if (lum > 1) lum = 1;
    if (lum < 0.08) lum = 0;

    let outR, outG, outB;
    if (lum < 0.45) {
      const t = lum / 0.45;
      outR = Math.round(5 + 230 * Math.pow(t, 1.4));
      outG = Math.round(6 + 85 * Math.pow(t, 1.6));
      outB = Math.round(8 + 5 * t);
    } else {
      const t = (lum - 0.45) / 0.55;
      outR = Math.round(235 + 20 * t);
      outG = Math.round(91 + 55 * t);
      outB = Math.round(13 + 25 * t);
    }

    outBuf[i * 3] = outR;
    outBuf[i * 3 + 1] = outG;
    outBuf[i * 3 + 2] = outB;
  }

  // Convert raw duotone to PNG buffer
  const duotonePng = await sharp(outBuf, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
  .png()
  .toBuffer();

  // Create horizontal motion blur kernel
  const kSize = 35;
  const hKernel = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < kSize; x++) {
      hKernel.push(y === 1 ? 1 / kSize : 0);
    }
  }

  const motionBlurredPng = await sharp(duotonePng)
    .convolve({
      width: kSize,
      height: 3,
      kernel: hKernel
    })
    .png()
    .toBuffer();

  // Composite motion blur overlay with duotone base
  await sharp(duotonePng)
    .composite([
      {
        input: motionBlurredPng,
        blend: 'screen',
        opacity: 0.55
      }
    ])
    .sharpen({ sigma: 1.2 })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('120 Race successfully generated with both riders facing same forward direction & zoomed in!');
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. 60 Fun Ride: Zoom in 1.35x into the peloton pack
  await cropZoom(
    path.join(brainDir, 'cat_60_twotone_1792139296899.jpg'),
    path.join(outDir, 'cat_60_funride.jpg'),
    1.35,
    0.55, // center-lower bias for bikes
    0.5
  );

  // 2. 100 Fondo: Zoom in 1.32x into the gritty rider & front tire
  await cropZoom(
    path.join(brainDir, 'cat_100_twotone_1792139328614.jpg'),
    path.join(outDir, 'cat_100_fondo.jpg'),
    1.32,
    0.48,
    0.5
  );

  // 3. 120 (Race): Two riders racing in the SAME forward direction + two-tone + motion blur + zoomed in!
  await process120Race();

  // 4. 150 Grand Fondo: Zoom in 1.35x into the rain climb, rider, and wet reflections
  await cropZoom(
    path.join(brainDir, 'cat_150_twotone_1792139383476.jpg'),
    path.join(outDir, 'cat_150_grandfondo.jpg'),
    1.35,
    0.55,
    0.5
  );

  // 5. 200 Ultra: Zoom in 1.32x into night navigation headlights and bikepacking frame
  await cropZoom(
    path.join(brainDir, 'cat_200_twotone_1792139414608.jpg'),
    path.join(outDir, 'cat_200_ultra.jpg'),
    1.32,
    0.50,
    0.5
  );

  // 6. Virtual Ride: Zoom in 1.35x into glowing GPS head unit on handlebar
  await cropZoom(
    path.join(brainDir, 'cat_virtual_twotone_1792139445524.jpg'),
    path.join(outDir, 'cat_virtual_ride.jpg'),
    1.35,
    0.52,
    0.5
  );

  console.log('All 6 categories zoomed in and updated successfully!');
}

main().catch(console.error);
