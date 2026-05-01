const fs = require('fs');

const file = 'msnc-v3/src/app/[locale]/(frontend)/join/JoinClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove font-black from font-display decorative watermark
content = content.replace(
  /className="absolute right-10 top-1\/2 -translate-y-1\/2 text-\[12vw\] font-black text-primary\/5 font-display select-none pointer-events-none leading-none uppercase"/g,
  'className="absolute right-10 top-1/2 -translate-y-1/2 text-[12vw] text-primary/5 font-display select-none pointer-events-none leading-none uppercase"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed JoinClient.tsx');
