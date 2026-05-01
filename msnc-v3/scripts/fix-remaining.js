const fs = require('fs');

function fixFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
}

// Fix events/[slug]/page.tsx
fixFile('msnc-v3/src/app/[locale]/(frontend)/events/[slug]/page.tsx', [
  ['text-[#002147]', 'text-primary'],
  ['font-black text-sm uppercase tracking-tight', 'uppercase tracking-tight'],
]);

// Fix leadership/[slug]/page.tsx
fixFile('msnc-v3/src/app/[locale]/(frontend)/leadership/[slug]/page.tsx', [
  ['text-[#002147]', 'text-primary'],
  ['first-letter:text-[#002147]', 'first-letter:text-primary'],
]);

// Fix program pages clamp
const programPages = [
  'msnc-v3/src/app/[locale]/(frontend)/programs/adult-learning-pathways/page.tsx',
  'msnc-v3/src/app/[locale]/(frontend)/programs/high-school-support/page.tsx',
  'msnc-v3/src/app/[locale]/(frontend)/programs/workshops-community/page.tsx',
  'msnc-v3/src/app/[locale]/(frontend)/programs/[slug]/page.tsx',
];

for (const file of programPages) {
  fixFile(file, [
    ['text-[clamp(3rem,6vw,6.5rem)]', 'text-5xl md:text-6xl lg:text-7xl'],
  ]);
}

// Fix success/join/[role]/page.tsx
fixFile('msnc-v3/src/app/[locale]/(frontend)/success/join/[role]/page.tsx', [
  ['tracking-[-0.05em]', 'tracking-tight'],
]);

// Fix EventPreview.tsx inline styles
fixFile('msnc-v3/src/components/sections/EventPreview.tsx', [
  [`style={{ height: '2rem', padding: '0 0.75rem', fontSize: '0.625rem' }}`, ''],
  ['btn btn-outline', 'btn btn-outline text-2xs'],
]);

console.log('Done fixing remaining issues');
