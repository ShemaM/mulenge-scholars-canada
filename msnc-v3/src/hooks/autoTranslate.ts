import type { CollectionAfterChangeHook } from 'payload';

async function translate(text: string): Promise<string> {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;

  const key = process.env.GEMINI_API_KEY;
  if (!key) return text;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Translate the following English text to French. Return ONLY the translated text with no explanations, quotes, or extra formatting. Context: Canadian nonprofit supporting Banyamulenge youth.\n\nText:\n${text}` }] }],
        generationConfig: { temperature: 0.2 }
      }),
    });
    
    if (!res.ok) {
      console.error(`Gemini translation error: ${res.status}`);
      return text;
    }
    
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
  } catch (error) {
    console.error('Translation fetch failed:', error);
    return text;
  }
}

async function translateLexical(node: any): Promise<any> {
  if (!node || typeof node !== 'object') return node;

  // Handle Arrays (like children arrays)
  if (Array.isArray(node)) {
    return Promise.all(node.map((n: any) => translateLexical(n)));
  }

  const newNode = { ...node };

  // 1. Translate the text if it exists
  if (newNode.text && typeof newNode.text === 'string' && newNode.text.trim() !== '') {
    newNode.text = await translate(newNode.text);
  }

  // 2. Recursively translate children if they exist
  if (newNode.children && Array.isArray(newNode.children)) {
    newNode.children = await Promise.all(newNode.children.map((child: any) => translateLexical(child)));
  }

  // 3. Handle the Lexical "root" node specifically if we are at the top level
  if (newNode.root && typeof newNode.root === 'object') {
    newNode.root = await translateLexical(newNode.root);
  }

  return newNode;
}

export const autoTranslate = (collectionSlug: string, fields: string[]): CollectionAfterChangeHook => {
  return async ({ doc, req, operation, context }) => {
    // Prevent infinite loops and only run on create/update
    if (context.skipTrigger || (operation !== 'create' && operation !== 'update')) {
      return doc;
    }

    // Only run if GEMINI_API_KEY is present
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('Skipping auto-translation: GEMINI_API_KEY is missing');
      return doc;
    }

    // We only want to trigger translation if we are saving in the 'en' locale (default)
    if (req.locale !== 'en') {
       return doc;
    }

    console.log(`🌐 Auto-translating ${collectionSlug} ID: ${doc.id}...`);

    const frFields: any = {};
    let hasChanges = false;
    let anyErrors = false;

    for (const field of fields) {
      const value = doc[field];
      if (!value) continue;

      try {
        if (typeof value === 'string') {
          const translated = await translate(value);
          if (translated && translated !== value) {
            frFields[field] = translated;
            hasChanges = true;
          }
        }
        // NOTE: RichText (Lexical) translation is currently disabled to prevent JSON corruption.
        // We only translate plain text fields to ensure data integrity.
      } catch (e) {
        console.error(`❌ Error translating field ${field}:`, e);
        anyErrors = true;
      }
    }

    if (hasChanges && !anyErrors) {
      try {
        await req.payload.update({
          collection: collectionSlug as any,
          id: doc.id,
          locale: 'fr',
          data: frFields,
          req,
          context: { skipTrigger: true },
        });
        console.log(`✅ Successfully saved French translation for ${collectionSlug} ID: ${doc.id}`);
      } catch (error) {
        console.error(`❌ Failed to save French translation for ${collectionSlug} ID: ${doc.id}:`, error);
      }
    } else if (anyErrors) {
      console.warn(`⚠️  Skipped saving French translation for ${collectionSlug} ID: ${doc.id} due to API errors.`);
    }

    return doc;
  };
};
