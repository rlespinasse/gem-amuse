import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(__dirname, '..', 'site');
const svgPath = resolve(siteDir, 'favicon.svg');
const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

mkdirSync(siteDir, { recursive: true });

for (const { name, size } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(resolve(siteDir, name));
  console.log(`Generated ${name}`);
}

// Generate ICO (from 16x16 and 32x32 PNGs embedded as single 32x32)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(resolve(siteDir, 'favicon.ico'));
console.log('Generated favicon.ico');

console.log('All favicons generated.');
