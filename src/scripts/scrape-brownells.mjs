import { writeFileSync, mkdirSync } from "node:fs";
import * as cheerio from "cheerio";

const BASE = "https://www.brownells.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const CATEGORIES = {
  rifles: ["/guns/rifles/", "/guns/rifles/bolt-action-rifles/", "/guns/rifles/semi-auto-rifles/", "/guns/rifles/lever-action-rifles/"],
  handguns: ["/guns/handguns/", "/guns/handguns/semi-auto-pistols/", "/guns/handguns/revolvers/"],
  shotguns: ["/guns/shotguns/"],
  gun_parts: ["/gun-parts/", "/gun-parts/rifle-parts/", "/gun-parts/handgun-parts/", "/gun-parts/shotgun-parts/"],
  magazines: ["/gun-parts/magazines/", "/gun-parts/magazines/rifle-magazines-parts/", "/gun-parts/magazines/handgun-magazines-parts/"],
  ammunition: ["/ammunition/", "/ammunition/rifle-ammunition/", "/ammunition/handgun-ammunition/", "/ammunition/shotgun-ammunition/", "/ammunition/rimfire-ammunition/"],
  optics: ["/optics/", "/optics/scopes/", "/optics/reflex-red-dot-sights/", "/optics/rings-mounts/"],
  reloading: ["/reloading/", "/reloading/reloading-dies/", "/reloading/reloading-presses-accessories/", "/reloading/components/"],
  tools_cleaning: ["/tools-cleaning/", "/tools-cleaning/gun-cleaning/", "/tools-cleaning/general-gunsmith-tools/"],
  gear: ["/gear/", "/gear/gun-cases-storage/", "/gear/tactical-gear/", "/gear/bipods-monopods/"],
};

const cleanImage = (src) => {
  if (!src) return "";
  // strip cloudflare transform prefix -> raw path
  const m = src.match(/\/globalassets\/.*|\/contentassets\/.*/i);
  const raw = m ? m[0] : src;
  return BASE + raw;
};

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": UA,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function parseProducts(html, sourceUrl, fallbackCategory) {
  const $ = cheerio.load(html);
  const products = [];
  $(".pl-item, .category-slider__item").each((_, el) => {
    const item = $(el);
    const titleLink = item.find(".category-slider__item__title").first();
    const imgLink = item.find(".category-slider__item__img").first();
    const href = (imgLink.attr("href") || titleLink.attr("href") || "").trim();
    const fullTitle = (
      imgLink.attr("aria-label") ||
      titleLink.text().trim()
    ).replace(/\s+/g, " ").trim();
    if (!fullTitle || !href) return;

    const priceEl = item.find(".category-slider__item__price").first();
    const current = (priceEl.attr("data-price") || priceEl.text() || "").replace(/\s+/g, " ").trim();
    const old = (priceEl.attr("data-price-old") || "").trim();

    const ratingEl = item.find(".star-rating").first();
    const rating = ratingEl.attr("data-rate") || "";

    let image = "";
    item.find("img").each((_, img) => {
      const src = $(img).attr("src") || $(img).attr("data-src") || "";
      if (/globalassets|contentassets/.test(src) && !/badg|logo/i.test(src)) {
        image = cleanImage(src);
      }
    });

    const badgeEl = item.find(".category-slider__item__rebate img").first();
    const badge = badgeEl.attr("src") ? cleanImage(badgeEl.attr("src")) : "";

    const inventory = item.find(".product-item-inventory").text().replace(/\s+/g, " ").trim();
    const pid = item.find("[data-pid]").attr("data-pid") || "";

    const nameParts = fullTitle.split(" - ");
    const brand = nameParts.length > 1 ? nameParts.shift().trim() : "Brownells";
    const name = nameParts.join(" - ").trim();

    products.push({
      id: pid || href.replace(/\//g, "-"),
      brand,
      name,
      title: fullTitle,
      price: current,
      oldPrice: old,
      rating: rating ? parseFloat(rating) : null,
      image,
      badge,
      availability: inventory,
      url: BASE + href,
      source: sourceUrl,
      category: fallbackCategory,
    });
  });
  return products;
}

async function run() {
  mkdirSync("scripts/data", { recursive: true });
  const all = {};
  let total = 0;
  for (const [key, urls] of Object.entries(CATEGORIES)) {
    const seen = new Set();
    const products = [];
    for (const u of urls) {
      try {
        const html = await fetchPage(BASE + u);
        const parsed = parseProducts(html, u, key);
        for (const p of parsed) {
          if (!seen.has(p.id)) {
            seen.add(p.id);
            products.push(p);
          }
        }
        console.log(`  ${u}: +${parsed.length} (total ${products.length})`);
      } catch (e) {
        console.log(`  ${u}: ERROR ${e.message}`);
      }
    }
    all[key] = products;
    total += products.length;
    writeFileSync(`scripts/data/products-${key}.json`, JSON.stringify(products, null, 2));
  }
  writeFileSync("scripts/data/products-all.json", JSON.stringify(all, null, 2));
  console.log(`\nDONE. ${total} products scraped across ${Object.keys(all).length} categories.`);
}

run();
