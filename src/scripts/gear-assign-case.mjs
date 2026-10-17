import { readFileSync, writeFileSync } from "node:fs";

const all = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

const assigns = {
  "pa-413244": "public/assets/products/gear/pa-413244.jpg",
  "pa-192220": "public/assets/products/gear/pa-192220.jpg",
  "pa-192229": "public/assets/products/gear/pa-192229.jpg",
  "pa-192238": "public/assets/products/gear/pa-192238.jpg",
};

let n = 0;
for (const [id, img] of Object.entries(assigns)) {
  for (const [cat, arr] of Object.entries(all)) {
    const p = arr.find((x) => x.id === id);
    if (p && !p.image) {
      p.image = img;
      n++;
      console.log(`assigned ${id} (${cat})`);
    }
  }
}
writeFileSync("scripts/data/products-all.json", JSON.stringify(all, null, 2));
console.log("done, assigned", n);
