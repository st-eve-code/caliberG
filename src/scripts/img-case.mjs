import { readFileSync } from "node:fs";

const all = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

// simulate applyFilters type=case over gear
const gear = all.gear || [];
const caseWords = ["case", "bag", "storage"];
const inCase = gear.filter((p) => {
  const hay = `${p.subcategory} ${p.name}`.toLowerCase();
  return caseWords.some((w) => hay.includes(w));
});
console.log("gear items matching type=case:", inCase.length);
console.log("  with image:", inCase.filter((p) => p.image).length);
console.log("  without image:", inCase.filter((p) => !p.image).length);

const noImg = inCase.filter((p) => !p.image);
for (const p of noImg.slice(0, 25)) {
  console.log(`  ${p.id} | ${p.subcategory} | ${p.name.slice(0, 60)}`);
}

// also check any gear items whose name has 'case'/'storage' but under other categories
for (const [cat, arr] of Object.entries(all)) {
  if (cat === "gear") continue;
  const hits = arr.filter((p) => {
    const hay = `${p.subcategory} ${p.name}`.toLowerCase();
    return caseWords.some((w) => hay.includes(w)) && !p.image;
  });
  if (hits.length) {
    console.log(`${cat}: ${hits.length} no-image items match case keywords`);
    for (const p of hits.slice(0, 5)) console.log(`  ${p.id} | ${p.name.slice(0, 60)}`);
  }
}
