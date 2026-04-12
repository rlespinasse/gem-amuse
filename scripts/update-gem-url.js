import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const newGemId = process.argv[2];
if (!newGemId) {
  console.error('Usage: node scripts/update-gem-url.js <gem-id>');
  process.exit(1);
}

const gemJsonPath = resolve(rootDir, 'gem.json');
const gem = JSON.parse(readFileSync(gemJsonPath, 'utf8'));
const oldUrl = gem.gemUrl;
const newUrl = `https://gemini.google.com/gem/${newGemId}?usp=sharing`;

if (oldUrl === newUrl) {
  console.log('Gem URL is already up to date.');
  process.exit(0);
}

const filesToUpdate = [
  'site/index.html',
  'README.md',
];

let totalReplacements = 0;
for (const relPath of filesToUpdate) {
  const filePath = resolve(rootDir, relPath);
  const content = readFileSync(filePath, 'utf8');
  const updated = content.replaceAll(oldUrl, newUrl);
  const count = (content.split(oldUrl).length - 1);
  if (count > 0) {
    writeFileSync(filePath, updated, 'utf8');
    console.log(`${relPath}: ${count} replacement(s)`);
    totalReplacements += count;
  } else {
    console.log(`${relPath}: no matches found`);
  }
}

gem.gemId = newGemId;
gem.gemUrl = newUrl;
writeFileSync(gemJsonPath, JSON.stringify(gem, null, 2) + '\n', 'utf8');
console.log('gem.json: updated');

console.log(`\nDone — ${totalReplacements} replacement(s) across ${filesToUpdate.length} files.`);
console.log(`Old URL: ${oldUrl}`);
console.log(`New URL: ${newUrl}`);
