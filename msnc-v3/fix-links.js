const fs = require('fs');

function fixFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [pattern, replacement] of replacements) {
    if (content.includes(pattern)) {
      content = content.split(pattern).join(replacement);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
  } else {
    console.log('No changes:', filePath);
  }
}

// blog/page.tsx
fixFile('src/app/[locale]/(frontend)/blog/page.tsx', [
  ['href={`/blog/${coverStory.slug}`}', "href={{ pathname: '/blog/[slug]', params: { slug: coverStory.slug } }}"],
  ['href={`/blog/${post.slug}`}', "href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}"]
]);

// blog/[slug]/page.tsx
fixFile('src/app/[locale]/(frontend)/blog/[slug]/page.tsx', [
  ['href={`/blog/${related.slug}`}', "href={{ pathname: '/blog/[slug]', params: { slug: related.slug } }}"]
]);

// events/page.tsx
fixFile('src/app/[locale]/(frontend)/events/page.tsx', [
  ['href={`/events/${event.slug}`}', "href={{ pathname: '/events/[slug]', params: { slug: event.slug } }}"]
]);

// events/[slug]/page.tsx - fix Link href="/events"
fixFile('src/app/[locale]/(frontend)/events/[slug]/page.tsx', [
  ['href="/events"', "href={{ pathname: '/events' }}"]
]);

// leadership/page.tsx
fixFile('src/app/[locale]/(frontend)/leadership/page.tsx', [
  ['href={`/leadership/${member.slug}`}', "href={{ pathname: '/leadership/[slug]', params: { slug: member.slug } }}"]
]);

// leadership/[slug]/page.tsx
fixFile('src/app/[locale]/(frontend)/leadership/[slug]/page.tsx', [
  ['href={`/leadership/${member.slug}` as any}', "href={{ pathname: '/leadership/[slug]', params: { slug: member.slug } }}"]
]);

// EventPreview.tsx
fixFile('src/components/sections/EventPreview.tsx', [
  ["href={`/events/${featuredEvent.slug || featuredEvent.id}`}", "href={{ pathname: '/events/[slug]', params: { slug: featuredEvent.slug || featuredEvent.id } }}"],
  ["href={`/events/${event.slug || event.id}`}", "href={{ pathname: '/events/[slug]', params: { slug: event.slug || event.id } }}"]
]);

console.log('All files processed.');
