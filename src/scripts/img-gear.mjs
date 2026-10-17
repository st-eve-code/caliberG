import { readFileSync } from "node:fs";

const p = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

const gear = p.gear || [];
const bySub = {};
for (const x of gear) {
  const sub = x.subcategory || "?";
  bySub[sub] = bySub[sub] || { total: 0, noImg: 0 };
  bySub[sub].total++;
  if (!x.image || !x.image.trim()) bySub[sub].noImg++;
}

console.log("gear breakdown by subcategory:");
for (const [sub, c] of Object.entries(bySub)) {
  console.log(`${sub.padEnd(28)} ${String(c.total).padStart(4)} total  ${String(c.noImg).padStart(4)} no-image`);
}

console.log("\n--- products without image (gear) ---");
const noImg = gear.filter((x) => !x.image || !x.image.trim());
for (const x of noImg) {
  console.log(`${x.id} | ${x.brand} | ${x.name.slice(0, 60)} | ${x.source}`);
}
