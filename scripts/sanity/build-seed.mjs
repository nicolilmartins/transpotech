// Gera scripts/sanity/seed.ndjson a partir do conteúdo atual de src/data.
// Cada arquivo em src/sanity/seed/ (exceto helpers) exporta `documents()`.
//
//   npm run sanity:seed
//   npx sanity dataset import scripts/sanity/seed.ndjson --dataset production --replace
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..");
const SEED_DIR = path.join(ROOT, "src/sanity/seed");
const OUT = path.join(ROOT, "scripts/sanity/seed.ndjson");

const files = readdirSync(SEED_DIR).filter((f) => f.endsWith(".ts") && f !== "helpers.ts");
const lines = [];
const ids = new Set();

for (const file of files) {
  const mod = await import(pathToFileURL(path.join(SEED_DIR, file)).href);
  const docs = mod.documents();
  for (const doc of docs) {
    if (ids.has(doc._id)) throw new Error(`_id duplicado: ${doc._id} (${file})`);
    ids.add(doc._id);
    lines.push(JSON.stringify(doc));
  }
  console.log(`${file}: ${docs.length} documento(s)`);
}

writeFileSync(OUT, lines.join("\n") + "\n");
console.log(`${lines.length} documentos em ${path.relative(ROOT, OUT)}`);
