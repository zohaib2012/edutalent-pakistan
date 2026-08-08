import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOGO = path.join(ROOT, 'src', 'assets', 'images', 'logo.jpeg');
const OUT = path.join(ROOT, 'public', 'icons');

const gradientBG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A73E8"/>
      <stop offset="100%" stop-color="#0D47A1"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
</svg>`;

const roundedTileSvg = (size, pad, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" rx="${radius}" fill="#ffffff"/>
</svg>`;

const roundedMaskSvg = (size, pad, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" rx="${radius}" fill="#ffffff"/>
</svg>`;

const makeIcon = async (size, tilePadRatio, logoPadRatio) => {
  const tilePad = Math.round(size * tilePadRatio);
  const tileSize = size - tilePad * 2;
  const radius = Math.round(tileSize * 0.18);
  const logoPad = Math.round(tileSize * logoPadRatio);
  const logoSize = tileSize - logoPad * 2;

  const logoBuf = await sharp(LOGO).resize(logoSize, logoSize, { fit: 'contain' }).png().toBuffer();

  const tileLayer = await sharp({
    create: { width: size, height: size, channels: 4, background: 'transparent' },
  })
    .composite([
      { input: Buffer.from(roundedTileSvg(size, tilePad, radius)), top: 0, left: 0 },
      { input: logoBuf, top: tilePad + logoPad, left: tilePad + logoPad },
      { input: Buffer.from(roundedMaskSvg(size, tilePad, radius)), top: 0, left: 0, blend: 'dest-in' },
    ])
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: 'transparent' },
  })
    .composite([
      { input: Buffer.from(gradientBG(size)), top: 0, left: 0 },
      { input: tileLayer, top: 0, left: 0 },
    ])
    .png()
    .toBuffer();
};

await mkdir(OUT, { recursive: true });

const jobs = [
  ['pwa-192x192.png', 192, 0.12, 0.22],
  ['pwa-512x512.png', 512, 0.12, 0.22],
  ['maskable-192x192.png', 192, 0.16, 0.18],
  ['maskable-512x512.png', 512, 0.16, 0.18],
  ['apple-touch-icon.png', 180, 0.12, 0.22],
  ['favicon.png', 64, 0.1, 0.2],
];

for (const [name, size, tilePadRatio, logoPadRatio] of jobs) {
  const buf = await makeIcon(size, tilePadRatio, logoPadRatio);
  await sharp(buf).toFile(path.join(OUT, name));
  console.log('generated', name);
}

console.log('Done. Icons written to', OUT);
