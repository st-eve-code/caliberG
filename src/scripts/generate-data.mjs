import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const raw = JSON.parse(readFileSync("scripts/data/products-all.json", "utf8"));
mkdirSync("src/lib/data", { recursive: true });

const parsePrice = (str) => {
  if (!str) return { min: null, max: null };
  const nums = (str.match(/\$[\d,]+(\.\d+)?/g) || []).map((s) =>
    parseFloat(s.replace(/[$,]/g, ""))
  );
  if (!nums.length) return { min: null, max: null };
  return { min: Math.min(...nums), max: Math.max(...nums) };
};

const usedSlugs = new Set();
const seenIds = new Set();
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeImage = (src) =>
  src && src.startsWith("public/") ? src.replace(/^public/, "") : src;

const products = [];
for (const [cat, items] of Object.entries(raw)) {
  for (const p of items) {
    if (seenIds.has(p.id)) continue;
    seenIds.add(p.id);

    const pathSegs = (p.url || "").split("/").filter(Boolean);
    const lastSeg = pathSegs[pathSegs.length - 1] || "";
    let slug = slugify(lastSeg) || slugify(p.name).slice(0, 60);
    if (usedSlugs.has(slug)) slug = `${slug}-${p.id}`;
    usedSlugs.add(slug);

    const { min, max } = parsePrice(p.price);
    const { min: oldMin } = parsePrice(p.oldPrice);

    products.push({
      ...p,
      image: normalizeImage(p.image),
      slug,
      priceMin: min,
      priceMax: max,
      compareAt: oldMin || null,
      subcategory: p.subcategory || pathSegs[pathSegs.length - 2] || "",
      // label map
      kind: cat === "handguns" || cat === "rifles" || cat === "shotguns" ? "firearm" : "accessory",
    });
  }
}

writeFileSync(
  "src/lib/data/products.json",
  JSON.stringify({ count: products.length, products }, null, 2)
);
console.log(`wrote ${products.length} products to src/lib/data/products.json`);
