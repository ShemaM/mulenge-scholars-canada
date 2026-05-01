const fs = require('fs');

const file = 'msnc-v3/src/app/[locale]/(frontend)/blog/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix inline style on h1
content = content.replace(
  /<h1 className="mb-6 font-display font-normal text-primary"\s+style=\{\{ fontSize: 'clamp\(2\.5rem,6vw,4\.5rem\)', lineHeight: '1\.05', letterSpacing: '-0\.03em' \}\}>/g,
  '<h1 className="mb-6 font-display font-normal text-primary text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">'
);

// Fix inline style on h2 in Related stories
content = content.replace(
  /<h2 className="font-display font-normal text-primary mb-0"\s+style=\{\{ fontSize: 'clamp\(1\.5rem,3vw,2\.25rem\)', letterSpacing: '-0\.02em' \}\}>/g,
  '<h2 className="font-display font-normal text-primary mb-0 text-2xl md:text-3xl tracking-tight">'
);

// Fix inline style on h4 in related posts
content = content.replace(
  /<h4 className="font-display font-normal text-primary transition-colors group-hover:text-secondary mb-0"\s+style=\{\{ fontSize: '1\.125rem', lineHeight: '1\.3', letterSpacing: '-0\.01em' \}\}>/g,
  '<h4 className="font-display font-normal text-primary transition-colors group-hover:text-secondary mb-0 text-lg leading-snug">'
);

// Fix inline style on h2 in CTA
content = content.replace(
  /<h2 className="font-display font-normal text-white mb-0 lg:max-w-xl"\s+style=\{\{ fontSize: 'clamp\(2rem,4vw,3rem\)', lineHeight: '1\.1', letterSpacing: '-0\.02em' \}\}>/g,
  '<h2 className="font-display font-normal text-white mb-0 lg:max-w-xl text-3xl md:text-4xl leading-tight tracking-tight">'
);

// Fix prose-p:text-[1.0625rem]
content = content.replace(/prose-p:text-\[1\.0625rem\]/g, 'prose-p:text-md');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed blog/[slug]/page.tsx');
