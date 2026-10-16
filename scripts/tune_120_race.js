const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function tune120() {
  const brainDir = 'C:\\Users\\ILHAM\\.gemini\\antigravity-ide\\brain\\7a93116e-b728-4981-a5af-96692859d106';
  const inputPath = path.join(brainDir, 'cat_120_race_1792138834627.jpg');
  const outputPath = 'c:\\Users\\ILHAM\\Downloads\\GRINDURANCE\\public\\categories\\cat_120_race.jpg';

  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  // 1. Zoom in tightly on the two racers charging forward side by side!
  // Crop 74% of the width and height, centered on both riders (from chest down to pedals/wheels)
  const cropW = Math.round(width * 0.74);
  const cropH = Math.round(height * 0.74);
  const left = Math.round((width - cropW) * 0.48);
  const top = Math.round(height * 0.22); // Focus tightly on both riders and bikes

  const cropped = await sharp(inputPath)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  const { data, info } = await sharp(cropped)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const outBuf = Buffer.alloc(numPixels * 3);

  // Apply dramatic chiaroscuro two-tone orange & pitch black with dark sky & rim lighting
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Luminance
      let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Darken top sky region so sky becomes deep black background with speed streaks
      const yNorm = y / info.height;
      if (yNorm < 0.28) {
        // Smoothly crush sky to dark black
        const skyFade = Math.pow(yNorm / 0.28, 1.8);
        lum = lum * skyFade;
      }

      // High contrast curve
      // Boost midtones, plunge deep shadows
      let curved = Math.pow(lum, 1.6) * 1.45;
      if (curved > 1) curved = 1;

      // Duotone Mapping:
      // Shadows -> Pure black [5, 5, 8]
      // Highlights / edges -> Electric Orange [250, 109, 11] to [255, 140, 25]
      let outR, outG, outB;
      if (curved < 0.4) {
        const t = curved / 0.4;
        outR = Math.round(5 + 230 * Math.pow(t, 1.5));
        outG = Math.round(5 + 75 * Math.pow(t, 1.8));
        outB = Math.round(8 + 2 * t);
      } else {
        const t = (curved - 0.4) / 0.6;
        outR = Math.round(235 + 20 * t);
        outG = Math.round(80 + 60 * t);
        outB = Math.round(10 + 20 * t);
      }

      outBuf[idx] = outR;
      outBuf[idx + 1] = outG;
      outBuf[idx + 2] = outB;
    }
  }

  // Base duotone PNG
  const duotonePng = await sharp(outBuf, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
  .png()
  .toBuffer();

  // Create horizontal speed blur streaks
  const kSize = 41;
  const hKernel = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < kSize; x++) {
      hKernel.push(y === 1 ? 1 / kSize : 0);
    }
  }

  const blurredPng = await sharp(duotonePng)
    .convolve({
      width: kSize,
      height: 3,
      kernel: hKernel
    })
    .png()
    .toBuffer();

  // Blend: strong motion blur on background + sharp crisp riders in front
  await sharp(duotonePng)
    .composite([
      {
        input: blurredPng,
        blend: 'screen',
        opacity: 0.65
      }
    ])
    .sharpen({ sigma: 1.5 })
    .jpeg({ quality: 96 })
    .toFile(outputPath);

  console.log('Tuned 120 Race generated successfully at:', outputPath);
}

tune120().catch(console.error);
