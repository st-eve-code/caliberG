import { writeFileSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const API = "https://www.primaryarms.com/api/items";
const IMG = "https://image.primaryarms.com/production/SSP Applications/NetSuite Inc. - SCA Mont Blanc/Development/img/";

const FIELDS = ["internalid","itemid","storedescription","onlinecustomerprice","pricelevel1","custitem_brand","isinstock","urlcomponent"].join(",");

const QUERIES = ["muzzleloader", "black powder", "flintlock", "firestick", "caplock", "percussion muzzleloader", "inline muzzleloader", "50 cal 209"];

const stripHtml = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(q) {
  const url = `${API}?q=${encodeURIComponent(q)}&limit=50&fields=${encodeURIComponent(FIELDS)}`;
  const r = await fetch(url, {
    headers: { "user-agent": UA, accept: "application/json", referer: "https://www.primaryarms.com/" },
    signal: AbortSignal.timeout(30000),
  });
  const j = await r.json();
  return j.items || [];
}

const MATCH = /muzzleloader|black powder|blackpowder|flintlock|firestick|caplock|percussion|50 cal\/209/i;

const found = new Map();
for (const q of QUERIES) {
  try {
    const items = await search(q);
    console.log(`${q}: ${items.length}`);
    for (const it of items) {
      const name = stripHtml(it.storedescription);
      if (MATCH.test(name)) found.set(it.internalid, it);
    }
    await delay(300);
  } catch (e) {
    console.log(`${q}: ERR ${e.message}`);
  }
}

const products = [...found.values()].map((it) => {
  const name = stripHtml(it.storedescription);
  const price = it.onlinecustomerprice ?? it.pricelevel1;
  return {
    id: String(it.internalid),
    brand: it.custitem_brand || "",
    name,
    title: `${it.custitem_brand || ""}${name ? " - " + name : ""}`.trim(),
    price: price != null ? `$${Number(price).toFixed(2)}` : "",
    oldPrice: "",
    rating: null,
    image: "",
    badge: "",
    availability: it.isinstock === false ? "Out of stock" : "In stock",
    url: it.urlcomponent ? `https://www.primaryarms.com/${it.urlcomponent}` : "",
    source: "/blackpowder/",
    category: "rifles",
    subcategory: "blackpowder",
    paItemid: it.itemid,
  };
});

console.log(`\nMatched ${products.length} muzzleloader items:`);
for (const p of products) console.log(`  [${p.brand}] ${p.name.slice(0, 90)} | ${p.price}`);

writeFileSync("scripts/data/products-pa-blackpowder.json", JSON.stringify(products, null, 2));
