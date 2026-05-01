const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'node_modules/.pnpm/payload@3.80.0_graphql@16.13.2_typescript@5.7.3/node_modules/payload/dist/bin/loadEnv.js');

// Implementation that loads env directly without @next/env dependency
const content = `import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cwd } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser
function parseEnvFile(filePath) {
    if (!existsSync(filePath)) {
        console.log('Env file not found:', filePath);
        return;
    }
    console.log('Loading env from:', filePath);
    
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) continue;
        
        // Find the first = sign
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        
        const key = trimmed.substring(0, eqIdx).trim();
        let value = trimmed.substring(eqIdx + 1).trim();
        
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        
        // Decode URL-encoded characters (e.g., %26 -> &)
        try {
            value = decodeURIComponent(value);
        } catch (e) {}
        
        // Only set if not already defined in process.env
        if (!process.env[key]) {
            process.env[key] = value;
            console.log('Set:', key, '=', value.substring(0, 20) + '...');
        }
    }
}

// Try to load test.env from various possible locations
const testEnvPaths = [
    path.resolve(__dirname, '../../test.env'),
    path.resolve(cwd(), 'test.env'),
    path.resolve(__dirname, '../../../test.env'),
];

for (const envPath of testEnvPaths) {
    if (existsSync(envPath)) {
        parseEnvFile(envPath);
        break;
    }
}

// Transform DATABASE_URL to DATABASE_URI (test.env uses DATABASE_URL but payload.config.ts expects DATABASE_URI)
if (process.env.DATABASE_URL && !process.env.DATABASE_URI) {
    process.env.DATABASE_URI = process.env.DATABASE_URL;
    console.log('Set DATABASE_URI from DATABASE_URL');
}

export const loadEnv = () => {
  // Return loaded env files for compatibility
  return {
    loaded: true,
    dotenv: { parsed: process.env }
  };
};

export const loadedEnvFiles = {
  loaded: true,
  dotenv: { parsed: process.env }
};
`;

fs.writeFileSync(p, content);
console.log('Fixed loadEnv.js - now using direct file parsing without @next/env');
