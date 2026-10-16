const sharp = require('sharp');
const fs = require('fs');

async function process120() {
  const inputPath = 'C:\\Users\\ILHAM\\.gemini\\antigravity-ide\\brain\\7a93116e-b728-4981-a5af-96692859d106\\cat_120_race_1792138834627.jpg';
  const outputPath = 'c:\\Users\\ILHAM\\Downloads\\GRINDURANCE\\public\\categories\\cat_120_race.jpg';

  // Read metadata to get dimensions
  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  // 1. Zoom in / Crop closer to the two riders:
  // The two riders are in the lower-middle half. Let's crop to focus tightly on them!
  // Width: crop 75% width centered, Height: crop from 15% to 85%
  const cropWidth = Math.round(width * 0.76);
  const cropHeight = Math.round(height * 0.76);
  const cropLeft = Math.round((width - cropWidth) / 2);
  const cropTop = Math.round(height * 0.18);

  const cropped = await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .resize(width, height)
    .toBuffer();

  // 2. Extract raw pixels for custom high-contrast orange-black duotone mapping + motion blur
  const { data, info } = await sharp(cropped)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const outBuf = Buffer.alloc(numPixels * 3);

  // Duotone palette:
  // Black: [10, 10, 12]
  // Deep Orange: [180, 50, 0]
  // Vibrant Orange: [250, 109, 11]
  // Bright Orange-Gold: [255, 160, 40]

  for (let i = 0; i < numPixels; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    // Perceived luminance
    let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // High contrast S-curve (crush blacks, boost highlights)
    lum = Math.pow(lum, 1.4);
    lum = lum * 1.25;
    if (lum > 1) lum = 1;
    if (lum < 0.05) lum = 0;

    // Map luminance to duotone orange and black
    let outR, outG, outB;
    if (lum < 0.5) {
      // From black [6, 7, 10] to [220, 80, 5]
      const t = lum / 0.5;
      outR = Math.round(6 + (220 - 6) * Math.pow(t, 1.3));
      outG = Math.round(7 + (80 - 7) * Math.pow(t, 1.5));
      outB = Math.round(10 + (5 - 10) * t);
    } else {
      // From [220, 80, 5] to [255, 150, 30]
      const t = (lum - 0.5) / 0.5;
      outR = Math.round(220 + (255 - 220) * t);
      outG = Math.round(80 + (150 - 80) * t);
      outB = Math.round(5 + (30 - 5) * t);
    }

    outBuf[i * 3] = outR;
    outBuf[i * 3 + 1] = outG;
    outBuf[i * 3 + 2] = outB;
  }

  // Create base duotone image
  const duotoneImg = await sharp(outBuf, {
    raw: { width: info.width, height: info.height, channels: 3 }
  }).toBuffer();

  // Create horizontal motion blur overlay
  // Create motion blur kernel horizontally
  const kSize = 31;
  const hKernel = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < kSize; x++) {
      hKernel.push(y === 1 ? 1 / kSize : 0);
    }
  }

  const motionBlurred = await sharp(duotoneImg)
    .convolve({
      width: kSize,
      height: 3,
      kernel: hKernel
    })
    .toBuffer();

  // Composite: blend 40% motion blur with 60% sharp duotone image for clarity of riders + speed streaks
  const finalBuffer = await sharp(duotoneImg)
    .composite([
      {
        input: motionBlurred,
        blend: 'screen',
        opacity: 0.45
      }
    ])
    .sharpen({ sigma: 1.5 })
    .jpeg({ quality: 92 })
    .toBuffer();

  fs.writeFileSync(outputPath, finalBuffer);
  console.log('Successfully generated zoomed-in two-tone 120 Race image at:', outputPath);
}

process120().catch(console.error);
