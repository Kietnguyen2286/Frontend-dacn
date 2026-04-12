import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiTestsDir = path.resolve(__dirname, '..');
const modulesDir = path.join(apiTestsDir, 'modules');
const outputCollectionPath = path.join(apiTestsDir, 'postman_collection.json');

const moduleDirEntries = await fs.readdir(modulesDir, { withFileTypes: true });

const moduleCollectionFolders = [];
for (const entry of moduleDirEntries.filter((dir) => dir.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const collectionPath = path.join(modulesDir, entry.name, 'collection.json');
  const raw = await fs.readFile(collectionPath, 'utf8');
  const parsed = JSON.parse(raw);
  moduleCollectionFolders.push(parsed);
}

const postmanCollection = {
  info: {
    name: 'Employee Management API - Modular Tests',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    description: 'Generated from tests/api/modules/*/collection.json'
  },
  item: moduleCollectionFolders,
  variable: [
    {
      key: 'baseUrl',
      value: 'http://localhost:5000/api',
      type: 'string'
    }
  ]
};

await fs.writeFile(outputCollectionPath, `${JSON.stringify(postmanCollection, null, 2)}\n`, 'utf8');
console.log(`Postman collection generated at: ${outputCollectionPath}`);
