import { readFileSync, writeFileSync } from "node:fs";

const all = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));
const pa = JSON.parse(readFileSync("scripts/data/products-pa.json", "utf8"));
const bp = JSON.parse(readFileSync("scripts/data/products-pa-blackpowder.json", "utf8"));

const prefix = (id) => `pa-${id}`;

const seen = new Set();
for (const arr of Object.values(all)) for (const p of arr) seen.add(p.id);

const pushUnique = (arr, items, catKey) => {
  let added = 0;
  for (const p of items) {
    p.id = prefix(p.id);
    p.category = catKey;
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    arr.push(p);
    added++;
  }
  return added;
};

let counts = {};

const gear = all.gear;
counts.gear = 0;
for (const [sub, items] of Object.entries(pa.gear)) {
  counts.gear += pushUnique(gear, items, "gear");
}

const suppressors = pa.suppressors.suppressors || [];
all.suppressors = all.suppressors || [];
counts.suppressors = pushUnique(all.suppressors, suppressors, "suppressors");

counts.rifles_bp = pushUnique(all.rifles, bp, "rifles");

writeFileSync("scripts/data/products-all.json", JSON.stringify(all, null, 2));
console.log("Merged. added:", JSON.stringify(counts));
for (const [k, arr] of Object.entries(all)) console.log(`  ${k}: ${arr.length}`);
