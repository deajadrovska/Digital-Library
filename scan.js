/**
 * scan.js — Run with: node scan.js
 * Scans images/ and updates data/logos.json
 * Preserves existing tags if file already exists.
 */

const fs   = require('fs');
const path = require('path');

const IMAGES_DIR  = path.join(__dirname, 'images');
const OUTPUT_FILE = path.join(__dirname, 'data', 'logos.json');
const LOGO_REGEX  = /^logo(\d+)\.(png|jpg|jpeg|webp|svg)$/i;

// Load existing logos.json to preserve tags
let existing = [];
if (fs.existsSync(OUTPUT_FILE)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
}
const existingMap = {};
existing.forEach(e => existingMap[e.filename] = e);

// Scan images folder
const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => LOGO_REGEX.test(f))
    .sort((a, b) => parseInt(a.match(LOGO_REGEX)[1]) - parseInt(b.match(LOGO_REGEX)[1]));

const logos = files.map((filename, i) => ({
    num:      String(i + 1).padStart(2, '0'),
    filename: filename,
    tags:     existingMap[filename]?.tags || [],  // preserve existing tags
}));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(logos, null, 2));

console.log(`✅ logos.json updated with ${logos.length} logo(s).`);
console.log(`📝 Open data/logos.json to add tags to each logo.`);
logos.forEach(l => console.log(`   • ${l.filename}  tags: [${l.tags.join(', ') || 'empty — fill these in!'}]`));