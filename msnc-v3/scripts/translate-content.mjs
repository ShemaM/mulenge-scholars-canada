#!/usr/bin/env node
import readline from 'readline';

const BASE_URL = 'http://localhost:3001';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const COLLECTIONS = ['events', 'programs', 'blogs'];
const TRANSLATABLE_FIELDS = {
  events: ['title', 'location', 'description'],
  programs: ['title', 'description', 'tagline', 'statLabel', 'statValue'],
  blogs: ['title', 'excerpt'],
};

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => { rl.question(question, (answer) => { rl.close(); resolve(answer); }); });
}

async function translate(text) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Translate the following English text to French. Return ONLY the translated text with no explanations, quotes, or extra formatting. Context: Canadian nonprofit supporting Banyamulenge youth.\n\nText:\n${text}` }] }],
      generationConfig: { temperature: 0.2 }
    }),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
}

async function payloadLogin(email, password) {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  return data.token;
}

async function fetchDocs(collection, token) {
  const res = await fetch(`${BASE_URL}/api/${collection}?locale=en&limit=100&depth=0`, {
    headers: { Authorization: `JWT ${token}` }
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  return data.docs || [];
}

async function updateDoc(collection, id, fields, token) {
  const res = await fetch(`${BASE_URL}/api/${collection}/${id}?locale=fr`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
}

async function main() {
  console.log('\n🌐 MSNC Auto-Translation Script (EN → FR)\n');
  if (!GEMINI_API_KEY) { console.error('❌ GEMINI_API_KEY not found'); process.exit(1); }

  const email = await prompt('📧 Payload admin email: ');
  const password = await prompt('🔑 Payload admin password: ');

  console.log('\n⏳ Logging in...');
  const token = await payloadLogin(email, password);
  console.log('✅ Logged in\n');

  let translated = 0, skipped = 0, errors = 0;

  for (const collection of COLLECTIONS) {
    const fields = TRANSLATABLE_FIELDS[collection];
    console.log(`\n📂 ${collection.toUpperCase()} — fields: ${fields.join(', ')}`);
    const docs = await fetchDocs(collection, token);
    console.log(`   ${docs.length} documents found`);

    for (const doc of docs) {
      console.log(`\n   📄 "${doc.title || doc.id}"`);
      const frFields = {};
      for (const field of fields) {
        const val = doc[field];
        if (!val || typeof val !== 'string') { console.log(`      ⏭  ${field}: empty`); skipped++; continue; }
        try {
          process.stdout.write(`      🔄 ${field}...`);
          frFields[field] = await translate(val);
          console.log(' ✅');
          translated++;
          await new Promise(r => setTimeout(r, 300));
        } catch (e) { console.log(` ❌ ${e.message}`); errors++; }
      }
      if (Object.keys(frFields).length > 0) {
        await updateDoc(collection, doc.id, frFields, token);
        console.log(`      💾 Saved`);
      }
    }
  }

  console.log(`\n${'═'.repeat(40)}`);
  console.log(`✅ Translated: ${translated} | ⏭ Skipped: ${skipped} | ❌ Errors: ${errors}`);
  console.log('🎉 Done! Check Payload admin → switch to fr locale\n');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
