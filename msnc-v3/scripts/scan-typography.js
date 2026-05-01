const fs = require('node:fs');
const path = require('node:path');

const SRC = path.join(__dirname, '..', 'src');
const EXT = /\.(tsx|ts|css|scss)$/;

const patterns = [
  { name: 'arbitrary-text-size',   re: /text-\[[^\]]+\]/g },
  { name: 'arbitrary-font-weight', re: /font-\[\d+\]/g },
  { name: 'arbitrary-leading',     re: /leading-\[[^\]]+\]/g },
  { name: 'arbitrary-tracking',    re: /tracking-\[[^\]]+\]/g },
  { name: 'inline-style-fontSize', re: /style=\{\{[^}]*fontSize[^}]*\}\}/gi },
  { name: 'inline-style-lineHeight', re: /style=\{\{[^}]*lineHeight[^}]*\}\}/gi },
  { name: 'inline-style-letterSpacing', re: /style=\{\{[^}]*letterSpacing[^}]*\}\}/gi },
];

function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(walk(full));
    else if (EXT.test(entry.name)) files.push(full);
  }
  return files;
}

const files = walk(SRC);
const out = [];

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const rel = path.relative(path.join(__dirname, '..'), file).replaceAll('\\', '/');
  let fileHas = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const pat of patterns) {
      const m = line.match(pat.re);
      if (m) {
        if (!fileHas) {
          out.push(`\n== ${rel} ==`);
          fileHas = true;
        }
        out.push(`  L${i+1} [${pat.name}]: ${line.trim()}`);
      }
    }
    // Also flag font-display with non-400 weight
    if (/font-display/.test(line) && /font-(bold|black|semibold|medium|extrabold)/.test(line)) {
      if (!fileHas) { out.push(`\n== ${rel} ==`); fileHas = true; }
      out.push(`  L${i+1} [display-weight]: ${line.trim()}`);
    }
    // Flag heading tags with non-400 weight
    if (/^\s*<(h[1-6])/.test(line) && /font-(bold|black|semibold|medium|extrabold)/.test(line)) {
      if (!fileHas) { out.push(`\n== ${rel} ==`); fileHas = true; }
      out.push(`  L${i+1} [heading-weight]: ${line.trim()}`);
    }
  }
}

const outPath = path.join(__dirname, '..', 'typography-scan-report.txt');
fs.writeFileSync(outPath, out.join('\n'), 'utf8');
console.log(`Wrote ${out.length} lines to ${outPath}`);

