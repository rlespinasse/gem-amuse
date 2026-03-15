import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const gemJsonPath = resolve(rootDir, 'gem.json');
const gem = JSON.parse(readFileSync(gemJsonPath, 'utf8'));
const gemUrl = gem.gemUrl;

console.log(`Gem URL: ${gemUrl}\n`);

// --- Consistency check ---
const expectedCounts = [
  { file: 'site/index.html', expected: 2 },
  { file: 'README.md', expected: 1 },
];

let consistencyOk = true;
for (const { file, expected } of expectedCounts) {
  const content = readFileSync(resolve(rootDir, file), 'utf8');
  const actual = content.split(gemUrl).length - 1;
  if (actual !== expected) {
    console.error(`FAIL  ${file}: expected ${expected} occurrence(s), found ${actual}`);
    consistencyOk = false;
  } else {
    console.log(`OK    ${file}: ${actual} occurrence(s)`);
  }
}

// --- Reachability check ---
let reachabilityOk = true;
try {
  const response = await fetch(gemUrl, { method: 'HEAD', redirect: 'manual' });
  if (response.status >= 400) {
    console.error(`FAIL  Reachability: HTTP ${response.status}`);
    reachabilityOk = false;
  } else {
    console.log(`OK    Reachability: HTTP ${response.status}`);
  }
} catch (err) {
  console.error(`FAIL  Reachability: ${err.message}`);
  reachabilityOk = false;
}

// --- Result ---
console.log('');
if (!consistencyOk || !reachabilityOk) {
  if (!consistencyOk) console.error('Consistency check failed.');
  if (!reachabilityOk) console.error('Reachability check failed.');
  process.exit(1);
}
console.log('All checks passed.');
