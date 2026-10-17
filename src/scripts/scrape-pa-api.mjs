import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const API = "https://www.primaryarms.com/api/items";
const IMG = "https://image.primaryarms.com/production/SSP Applications/NetSuite Inc. - SCA Mont Blanc/Development/img/";
const OUT = "scripts/data/products-pa.json";
const OUT_META = "scripts/data/products-pa-meta.json";

const CATEGORIES = [
  { pa: "suppressors", appCat: "suppressors", sub: "suppressors" },
  { pa: "holsters", appCat: "gear", sub: "holsters" },
  { pa: "belts", appCat: "gear", sub: "belts" },
  { pa: "pouches", appCat: "gear", sub: "pouches" },
  { pa: "knives", appCat: "gear", sub: "knives" },
  { pa: "handheld-lights", appCat: "gear", sub: "handheld-lights" },
  { pa: "plate-carriers", appCat: "gear", sub: "plate-carriers" },
  { pa: "chest-rigs", appCat: "gear", sub: "chest-rigs" },
  { pa: "body-armor", appCat: "gear", sub: "body-armor" },
  { pa: "handcuffs", appCat: "gear", sub: "handcuffs" },
  { pa: "batons", appCat: "gear", sub: "batons" },
  { pa: "pepper-spray", appCat: "gear", sub: "pepper-spray" },
  { pa: "helmets", appCat: "gear", sub: "helmets" },
  { pa: "helmet-accessories", appCat: "gear", sub: "helmet-accessories" },
  { pa: "plate-carrier-components", appCat: "gear", sub: "plate-carrier-components" },
  { pa: "badges-insignia", appCat: "gear", sub: "badges-insignia" },
  { pa: "gas-masks", appCat: "gear", sub: "gas-masks" },
];

const FIELDS = [
  "internalid",
  "itemid",
  "storedescription",
  "onlinecustomerprice",
  "pricelevel1",
  "custitem_brand",
  "isinstock",
  "urlcomponent",
].join(",");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const stripHtml = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function fetchJson(url) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": UA, accept: "application/json", referer: "https://www.primaryarms.com/" },
        signal: AbortSignal.timeout(30000),
      });
      const text = await res.text();
      if (!text.startsWith("{")) throw new Error("non-JSON (blocked?) len=" + text.length);
      const j = JSON.parse(text);
      if (!Array.isArray(j.items)) throw new Error("missing items array");
      return j;
    } catch (e) {
      if (attempt === 5) throw e;
      const wait = 5000 * attempt;
      console.log(`  retry ${attempt} after ${wait}ms: ${e.message}`);
      await delay(wait);
    }
  }
}

async function probeImage(itemid) {
  const enc = encodeURIComponent(itemid);
  for (const suffix of ["_00", "_01", "_02", "_03"]) {
    const url = `${IMG}${enc}${suffix}.jpg?resizeid=3&resizeh=280&resizew=320`;
    try {
      const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(15000) });
      if (res.status === 200) return url;
    } catch {
      /* keep trying suffixes */
    }
  }
  return "";
}

function toProduct(it, cat) {
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
    source: `/${cat.pa}/`,
    category: cat.appCat,
    subcategory: cat.sub,
    paItemid: it.itemid,
  };
}

async function scrapeCategory(cat) {
  const urlPart = encodeURIComponent("/" + cat.pa);
  const first = await fetchJson(`${API}?c=0&commercecategoryurl=${urlPart}&offset=0&limit=50&fields=${encodeURIComponent(FIELDS)}`);
  const total = first.total;
  const items = [...first.items];
  for (let offset = 50; offset < total; offset += 50) {
    const page = await fetchJson(`${API}?c=0&commercecategoryurl=${urlPart}&offset=${offset}&limit=50&fields=${encodeURIComponent(FIELDS)}`);
    items.push(...page.items);
  }
  console.log(`  [${cat.pa}] total=${total} fetched=${items.length}`);
  return items.map((it) => toProduct(it, cat));
}

const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const existingMeta = existsSync(OUT_META) ? JSON.parse(readFileSync(OUT_META, "utf8")) : {};

for (const cat of CATEGORIES) {
  const have = existing[cat.appCat]?.[cat.pa]?.length;
  console.log(`\nScraping ${cat.pa}${have ? ` (have ${have}, refreshing)` : ""}`);
  try {
    const products = await scrapeCategory(cat);
    const meta = { at: Date.now(), total: products.length };
    const pool = 8;
    for (let i = 0; i < products.length; i += pool) {
      const batch = products.slice(i, i + pool);
      await Promise.all(batch.map((p) => probeImage(p.paItemid).then((img) => (p.image = img))));
    }
    const withImg = products.filter((p) => p.image).length;
    meta.images = withImg;
    existing[cat.appCat] = { ...(existing[cat.appCat] || {}), [cat.pa]: products };
    existingMeta[cat.pa] = meta;
    writeFileSync(OUT, JSON.stringify(existing, null, 2));
    writeFileSync(OUT_META, JSON.stringify(existingMeta, null, 2));
    console.log(`  saved ${products.length} (${withImg} with images)`);
    await delay(400);
  } catch (e) {
    console.log(`  FAILED ${cat.pa}: ${e.message}`);
  }
}

console.log("\nDone.");
