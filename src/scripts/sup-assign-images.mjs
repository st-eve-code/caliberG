import { readFileSync, writeFileSync } from "node:fs";

const p = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));

const IMG = "https://image.primaryarms.com/production/SSP Applications/NetSuite Inc. - SCA Mont Blanc/Development/img/";
const qs = "?resizeid=3&resizeh=280&resizew=320";

const imgMap = {
  "pa-463268": "public/assets/products/suppressors/pa-463268.jpg",
  "pa-463264": "public/assets/products/suppressors/pa-463264.webp",
  "pa-249422": IMG + encodeURIComponent("2159") + "_01.jpg" + qs,
  "pa-249421": IMG + encodeURIComponent("2450") + "_01.jpg" + qs,
  "pa-227748": IMG + encodeURIComponent("SIERRA5XM") + "_01.jpg" + qs,
  "pa-162977": IMG + encodeURIComponent("YHM-4380") + "_01.jpg" + qs,
  "pa-125260": IMG + encodeURIComponent("SIL-TP-QUICKIE-762") + "_01.jpg" + qs,
};

let updated = 0;
for (const [cat, items] of Object.entries(p)) {
  for (const x of items) {
    if (imgMap[x.id] && !x.image) {
      x.image = imgMap[x.id];
      updated++;
    }
  }
}

writeFileSync("scripts/data/products-all.json", JSON.stringify(p, null, 2));
console.log("updated", updated, "items");
