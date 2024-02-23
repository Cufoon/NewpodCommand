import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// fs.rmSync(resolve(__dirname, '../tsbuild'), { recursive: true, force: true });
