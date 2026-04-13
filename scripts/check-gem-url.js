import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const gemJsonPath = resolve(rootDir, 'gem.json');
const { gems } = JSON.parse(readFileSync(gemJsonPath, 'utf8'));

const indexHtml = readFileSync(resolve(rootDir, 'site/index.html'), 'utf8');
const readme = readFileSync(resolve(rootDir, 'README.md'), 'utf8');

let allOk = true;

for (const gem of gems) {
  const { name, gemUrl } = gem;
  console.log(`\n${name}`);
  console.log(`  URL: ${gemUrl}`);

  // Consistency: each gem URL appears once in index.html
  const htmlCount = indexHtml.split(gemUrl).length - 1;
  if (htmlCount !== 1) {
    console.error(`  FAIL  site/index.html: expected 1 occurrence, found ${htmlCount}`);
    allOk = false;
  } else {
    console.log(`  OK    site/index.html: ${htmlCount} occurrence(s)`);
  }

  // Reachability
  try {
    const response = await fetch(gemUrl, { method: 'HEAD', redirect: 'manual' });
    if (response.status >= 400) {
      console.error(`  FAIL  Reachability: HTTP ${response.status}`);
      allOk = false;
    } else {
      console.log(`  OK    Reachability: HTTP ${response.status}`);
    }
  } catch (err) {
    console.error(`  FAIL  Reachability: ${err.message}`);
    allOk = false;
  }
}

// README: all gem URLs should appear at least once
console.log('\nREADME.md');
for (const gem of gems) {
  const count = readme.split(gem.gemUrl).length - 1;
  if (count < 1) {
    console.warn(`  WARN  ${gem.name}: not found in README.md`);
  } else {
    console.log(`  OK    ${gem.name}: ${count} occurrence(s)`);
  }
}

console.log('');
if (!allOk) {
  console.error('One or more checks failed.');
  process.exit(1);
}
console.log('All checks passed.');
