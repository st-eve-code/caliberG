import { readFileSync, writeFileSync } from "node:fs";

const p = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

const imgMap = {
  "pa-210180": "public/assets/products/blackpowder/tc-endeavor.jpg",
  "pa-207157": "public/assets/products/blackpowder/ct-scope.jpg",
  "pa-207949": "public/assets/products/blackpowder/lyman-17a.jpg",
  "pa-207272": "public/assets/products/blackpowder/dnz-traditions.png",
  "pa-210159": "public/assets/products/blackpowder/tc-encore.jpg",
  "pa-207249": "public/assets/products/blackpowder/dnz-cva.png",
  "pa-207248": "public/assets/products/blackpowder/dnz-cva.png",
};

let updated = 0;
for (const [cat, items] of Object.entries(p)) {
  for (const x of items) {
    if (imgMap[x.id]) {
      x.image = imgMap[x.id];
      updated++;
    }
  }
}

writeFileSync("scripts/data/products-all.json", JSON.stringify(p, null, 2));
console.log("updated", updated, "items");
