import { readFileSync } from "node:fs";

const p = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

let total = 0;
let noImg = 0;
const byCat = {};

for (const [cat, items] of Object.entries(p)) {
  byCat[cat] = { total: items.length, noImg: items.filter((x) => !x.image || !x.image.trim()).length };
  total += items.length;
  noImg += byCat[cat].noImg;
}

console.log("TOTAL:", total, "| WITHOUT IMAGE:", noImg);
console.log("");
for (const [cat, c] of Object.entries(byCat)) {
  const pct = c.total ? Math.round((c.noImg / c.total) * 100) : 0;
  console.log(`${cat.padEnd(18)} ${String(c.total).padStart(4)} total  ${String(c.noImg).padStart(4)} no-image  (${pct}%)`);
}
