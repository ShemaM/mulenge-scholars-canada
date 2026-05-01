const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/forms/ContactForm.tsx',
  'src/components/layout/BreadcrumbWrapper.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/sections/CTA_Split.tsx',
  'src/components/sections/EventPreview.tsx',
  'src/components/sections/ProgramContextSection.tsx',
  'src/components/sections/ScholarshipList.tsx',
  'src/components/sections/Services.tsx',
  'src/components/sections/Testimonials.tsx',
  'src/components/ui/breadcrumb.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/Label.tsx',
  'src/app/[locale]/(frontend)/blog/page.tsx',
  'src/app/[locale]/(frontend)/blog/[slug]/page.tsx',
  'src/app/[locale]/(frontend)/events/page.tsx',
  'src/app/[locale]/(frontend)/events/[slug]/page.tsx',
  'src/app/[locale]/(frontend)/impact/rebuilding-futures/page.tsx',
  'src/app/[locale]/(frontend)/join/JoinClient.tsx',
  'src/app/[locale]/(frontend)/leadership/page.tsx',
  'src/app/[locale]/(frontend)/leadership/[slug]/page.tsx',
  'src/app/[locale]/(frontend)/loading.tsx',
  'src/app/[locale]/(frontend)/programs/adult-learning-pathways/page.tsx',
  'src/app/[locale]/(frontend)/programs/high-school-support/page.tsx',
  'src/app/[locale]/(frontend)/programs/page.tsx',
  'src/app/[locale]/(frontend)/programs/workshops-community/page.tsx',
  'src/app/[locale]/(frontend)/programs/[slug]/page.tsx',
  'src/app/[locale]/(frontend)/success/join/[role]/page.tsx',
  'src/app/[locale]/(frontend)/success/[type]/page.tsx',
];

function fixFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  // Fix heading weights: remove font-bold, font-black, font-semibold from h1-h6 tags
  content = content.replace(/(<h[1-6][^>]*?)\s+font-(bold|black|semibold|medium|extrabold)([^>]*>)/g, '$1$3');
  
  // Fix display font weights: remove font-bold, font-black, font-semibold, font-medium from font-display
  content = content.replace(/(font-display[^"]*?)\s+font-(bold|black|semibold|medium|extrabold)/g, '$1');
  content = content.replace(/font-(bold|black|semibold|medium|extrabold)\s+(font-display[^"]*?)/g, '$2');
  
  // Fix arbitrary text sizes
  content = content.replace(/text-\[10px\]/g, 'text-2xs');
  content = content.replace(/text-\[11px\]/g, 'text-nav');
  content = content.replace(/text-\[9px\]/g, 'text-label');
  
  // Fix arbitrary tracking to closest Tailwind tokens
  content = content.replace(/tracking-\[0\.15em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.2em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.25em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.3em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.4em\]/g, 'tracking-widest');
  content = content.replace(/tracking-\[0\.5em\]/g, 'tracking-widest');
  
  // Fix arbitrary leading to closest Tailwind tokens
  content = content.replace(/leading-\[1\.1\]/g, 'leading-tight');
  content = content.replace(/leading-\[0\.95\]/g, 'leading-none');
  content = content.replace(/leading-\[0\.9\]/g, 'leading-none');
  content = content.replace(/leading-\[0\.85\]/g, 'leading-none');
  content = content.replace(/leading-\[1\.05\]/g, 'leading-tight');
  content = content.replace(/leading-\[1\.8\]/g, 'leading-relaxed');
  content = content.replace(/leading-\[1\.9\]/g, 'leading-relaxed');
  content = content.replace(/leading-\[1\.3\]/g, 'leading-snug');
  content = content.replace(/leading-\[0\.75\]/g, 'leading-none');
  content = content.replace(/leading-\[0\.7\]/g, 'leading-none');
  
  // Fix inline style fontSize patterns - these need manual review but try common ones
  // style={{ fontSize: 'clamp(...)', lineHeight: '...', letterSpacing: '...' }}
  // For blog/[slug]/page.tsx and similar, replace with Tailwind classes
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`FIXED: ${filePath}`);
  } else {
    console.log(`OK: ${filePath}`);
  }
}

for (const file of filesToFix) {
  fixFile(file);
}

console.log('\nDone! Now manually review files with inline styles:');
console.log('- src/app/[locale]/(frontend)/blog/[slug]/page.tsx');
console.log('- src/app/[locale]/(frontend)/events/[slug]/page.tsx');
console.log('- src/components/sections/EventPreview.tsx');
