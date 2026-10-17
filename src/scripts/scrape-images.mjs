import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, extname } from "node:path";

const BASE = "https://www.brownells.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const CONCURRENCY = 8;
const out = (p) => {
  const dir = dirname(p);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return p;
};

async function download(url, dest) {
  if (existsSync(dest) && existsSync(dest) ) return "exists";
  try {
    const res = await fetch(url, { headers: { "user-agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) throw new Error("too small");
    writeFileSync(out(dest), buf);
    return "ok";
  } catch (e) {
    return `ERR ${e.message}`;
  }
}

async function pool(items, fn) {
  const results = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

const transform = (rawPath, width) =>
  BASE + `/cdn-cgi/image/width=${width},format=webp,quality=70` + rawPath;

async function products() {
  const all = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));
  const list = [];
  const localMap = {};
  for (const [cat, prods] of Object.entries(all)) {
    for (const p of prods) {
      if (!p.image) continue;
      const ext = ".webp";
      const dest = `public/assets/products/${cat}/${p.id}${ext}`;
      list.push({ url: transform(p.image.replace(BASE, ""), 400), dest });
      localMap[`${cat}:${p.id}`] = dest.replace(/^public/, "");
    }
  }
  console.log(`Downloading ${list.length} product images...`);
  const statuses = await pool(list, async (t) => {
    const s = await download(t.url, t.dest);
    if (s !== "ok" && s !== "exists") return `${t.url} ${s}`;
    return null;
  });
  const fails = statuses.filter(Boolean);
  console.log(`  product images: ${list.length - fails.length} ok, ${fails.length} failed`);

  // rewrite product data with local image paths
  const newAll = {};
  for (const [cat, prods] of Object.entries(all)) {
    newAll[cat] = prods.map((p) => ({
      ...p,
      image: localMap[`${cat}:${p.id}`] || p.image,
    }));
  }
  writeFileSync("scripts/data/products-all.json", JSON.stringify(newAll, null, 2));
  for (const [cat, prods] of Object.entries(newAll)) {
    writeFileSync(`scripts/data/products-${cat}.json`, JSON.stringify(prods, null, 2));
  }
  return fails;
}

async function banners() {
  const items = [
    ["hero-main", "/globalassets/homepage---brownells/homepage-main/7039-brownells-homepage---week-32_hero-banner.png", 1400],
    ["hero-main-mobile", "/globalassets/homepage---brownells/homepage-main/7039-brownells-homepage---week-32_hero-banner-mobile.png", 700],
    ["side-magpul", "/globalassets/homepage---brownells/homepage-right-content/7039-brownells-homepage---week-32_side-banner-1.png", 900],
    ["side-dd-optic", "/globalassets/homepage---brownells/homepage-right-content/7134-brownells-email---web-banners---week-32---buy-a-dd-uppers_web-side-banner-1.jpg", 900],
    ["sub-fgmm", "/globalassets/homepage---brownells/homepage-sub/sub-banner-backgrounds_left_fgmm.jpg", 900],
    ["sub-tools", "/globalassets/homepage---brownells/homepage-sub/sub-banner-backgrounds_left_tools.jpg", 900],
    ["media-brn4", "/globalassets/homepage---brownells/homepage-sub/brn4.jpg", 900],
    ["media-podcast", "/globalassets/ecomm-photos/built-to-last-podcast-homepage-feature-banner_artboard-2.jpg", 900],
    ["media-brn180", "/contentassets/2995a313eb644dd29a2cb8cb439ac075/brn180-linev2.jpg", 900],
    ["media-house", "/globalassets/homepage---brownells/brownells-house_products.png", 900],
    ["media-deals", "/globalassets/dealspnd-500.webp", 900],
    ["media-new", "/contentassets/f16482f67f464f239895457b6d7b6360/newproducts4-25.png", 900],
    ["mm-dd-uppers", "/globalassets/mega-menus--brownells/7134-brownells-email---web-banners---week-32---buy-a-dd-uppers_mm.jpg", 400],
    ["mm-glock-slides", "/globalassets/mega-menus--brownells/4661-brn-premium-glock-slides-megamenu-395x395.jpg", 400],
    ["category-hero-geissele", "/globalassets/category-hero-banners---brownells/6294-brownells-banners---week-11---category-header_geissele.jpg", 1600],
  ];
  const list = items.map(([name, path, w]) => ({
    name,
    url: transform(path, w),
    dest: `public/assets/banners/${name}${extname(path).toLowerCase() === ".png" ? ".png" : ".jpg"}`,
  }));
  console.log("Downloading banners...");
  await pool(list, async (t) => {
    const s = await download(t.url, t.dest);
    console.log(`  ${t.name}: ${s}`);
  });
}

async function badges() {
  const items = [
    ["limited-qty", "/contentassets/9ab8763b2f8343b097c1f0cbf37166de/limited-quantity10px.svg"],
    ["ships-free-magpul", "/contentassets/9ab8763b2f8343b097c1f0cbf37166de/badging-assets_ships-free-w-code-magpulfs-10pxpadding.png"],
    ["trigger-12", "/contentassets/9ab8763b2f8343b097c1f0cbf37166de/badging-assets_trigger_12.png"],
    ["sale", "/contentassets/9ab8763b2f8343b097c1f0cbf37166de/badging-assets---10px-padding_sale.svg"],
    ["placeholder", "/dist/Brownells/images/img-placeholder.jpg"],
  ];
  console.log("Downloading badges...");
  await pool(items, async ([name, path]) => {
    const s = await download(BASE + path, `public/assets/badges/${name}${extname(path)}`);
    console.log(`  ${name}: ${s}`);
  });
}

const categoryTiles = [
  ["rifle-parts", "/contentassets/6f407b242bd04f228832438f99395716/feature-category---no-text_rifle-parts-s.jpg"],
  ["gunsmith-tools", "/globalassets/feature-category---no-text_gunsmith-tools-s.jpg"],
  ["reloading-components", "/globalassets/feature-category---no-text_reloading-components-s.jpg"],
  ["handgun-parts", "/globalassets/feature-category---no-text_handgun-parts-s.jpg"],
  ["ammo", "/globalassets/feature-category---no-text_ammo-s.jpg"],
  ["firearms", "/globalassets/feature-category---no-text_firearms-s.jpg"],
  ["scopes", "/globalassets/feature-category---no-text_scopes-and-accessories-s.jpg"],
  ["red-dots", "/globalassets/feature-category---no-text_red-dots-s.jpg"],
  ["rifle-mags", "/globalassets/feature-category---no-text_rifle-mags-s.jpg"],
  ["suppressors", "/globalassets/feature-category---no-text_suppressors-s.jpg"],
];

async function categories() {
  console.log("Downloading category tiles...");
  await pool(categoryTiles, async ([name, path]) => {
    const s = await download(transform(path, 400), `public/assets/categories/${name}${extname(path)}`);
    console.log(`  ${name}: ${s}`);
  });
}

const results = {};
try { results.products = await products(); } catch (e) { console.log("products ERROR", e.message); }
try { await banners(); } catch (e) { console.log("banners ERROR", e.message); }
try { await badges(); } catch (e) { console.log("badges ERROR", e.message); }
try { await categories(); } catch (e) { console.log("categories ERROR", e.message); }
console.log("\nIMAGE DOWNLOAD DONE");
