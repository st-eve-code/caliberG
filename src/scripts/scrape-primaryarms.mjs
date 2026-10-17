import { readFileSync, writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const HDRS = {
  "user-agent": UA,
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

const ALL_FILE = "scripts/data/products-all.json";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  { key: "suppressors", appCat: "suppressors", url: "https://www.primaryarms.com/suppressors" },
  { key: "black_powder", appCat: "black_powder", url: "https://www.primaryarms.com/black-powder" },
  { key: "duty_gear", appCat: "gear", url: "https://www.primaryarms.com/duty-gear" },
  { key: "holsters", appCat: "gear", url: "https://www.primaryarms.com/holsters" },
];

const isShell = (html) => html.includes("shopping.environment.ssp") && html.length < 20000;

// Wait for the Akamai block to clear: poll every 60s until we get SSR content for the first URL
async function waitForClear(url, maxWaitMin = 20) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMin * 60000) {
    try {
      const res = await fetch(url, {
        headers: HDRS,
        signal: AbortSignal.timeout(30000),
      });
      const html = await res.text();
      if (!isShell(html) && html.length > 30000) {
        console.log(`  CLEARED after ${Math.round((Date.now() - start) / 1000)}s`);
        return html;
      }
      console.log(`  waiting... (${Math.round((Date.now() - start) / 60000)}min)`);
    } catch (e) {
      console.log("  err", e.message);
    }
    await sleep(60000);
  }
  return null;
}

console.log("Waiting for rate-limit to clear...");
const first = TARGETS[0];
const firstHtml = await waitForClear(first.url);
if (!firstHtml) {
  console.log("Still blocked after 20min. Aborting.");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(ALL_FILE, "utf8"));
const seenUrls = new Map(); // url -> appCat
for (const [cat, items] of Object.entries(raw)) {
  for (const p of items) if (p.source === "primaryarms") seenUrls.set(p.url, cat);
}

async function processTarget(t, html) {
  const $ = cheerio.load(html);
  const items = [];
  $("a.show-details-redirect").each((_, el) => {
    const $el = $(el);
    const href = $el.attr("href") || "";
    if (!href) return;
    const img = $el.find("img[src*='images.primaryarms.com']").first();
    const name = (img.attr("alt") || "").trim();
    if (!name) return;
    const imgSrc = (img.attr("src") || "").replace(/^\/\//, "https://");
    const txt = $el.text().replace(/\s+/g, " ").trim();
    const priceMatch = txt.match(/\$\d+[\d,]*\.\d{2}/);
    const inStock = /in stock/i.test(txt);
    const outStock = /out of stock/i.test(txt);
    const slug = href.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 60);
    const url = "https://www.primaryarms.com" + href;
    items.push({
      id: "PA-" + slug,
      brand: name.split(" ")[0].replace(/[,]/g, ""),
      name,
      title: name,
      price: priceMatch ? priceMatch[0] : "",
      oldPrice: "",
      rating: null,
      image: imgSrc,
      badge: outStock ? "Out of Stock" : inStock ? "In Stock" : "",
      availability: outStock ? "Out of stock" : "In stock",
      url,
      source: "primaryarms",
      subcategory: t.key,
    });
  });
  const arr = raw[t.appCat] || (raw[t.appCat] = []);
  const fresh = items.filter((p) => !seenUrls.has(p.url));
  for (const p of fresh) seenUrls.set(p.url, t.appCat);
  arr.push(...fresh);
  console.log(`${t.key}: ${items.length} on page, +${fresh.length} new -> ${t.appCat} (total ${arr.length})`);
  writeFileSync(ALL_FILE, JSON.stringify(raw, null, 2));
  await sleep(45000);
}

await processTarget(TARGETS[0], firstHtml);
for (const t of TARGETS.slice(1)) {
  console.log(`\n=== ${t.key} ===`);
  let html = null;
  for (let i = 1; i <= 6 && !html; i++) {
    try {
      const res = await fetch(t.url, {
        headers: HDRS,
        signal: AbortSignal.timeout(30000),
      });
      const h = await res.text();
      if (!isShell(h) && h.length > 30000) html = h;
      else console.log(`  try ${i}: still shell, waiting 90s`);
    } catch (e) {
      console.log(`  try ${i}: err, waiting 90s`);
    }
    if (!html) await sleep(90000);
  }
  if (!html) {
    console.log(`  FAILED ${t.key}`);
    continue;
  }
  await processTarget(t, html);
}

console.log("\nDONE");
