import { readFileSync } from "node:fs";
import * as cheerio from "cheerio";

const html = readFileSync("scripts/pa-archive-suppressors.html", "utf8");
const $ = cheerio.load(html);

// Find anchors pointing to product detail pages - look at the /suppressors/<product-slug> pattern
// Product links are typically /suppressors/<slug> where slug has more segments
const productLinks = new Map();
$("a[href]").each((_, el) => {
  const href = $(el).attr("href") || "";
  const m = href.match(/\/suppressors\/([a-z0-9-]+)$/i);
  if (m && !["multical-suppressors", "pistol-suppressors", "rifle-suppressors", "rimfire-suppressors"].includes(m[1])) {
    const img = $(el).find("img").first();
    const alt = img.attr("alt") || "";
    const src = img.attr("src") || "";
    productLinks.set(href, { alt: alt.slice(0, 70), src: src.slice(0, 90) });
  }
});
console.log("product-ish links:", productLinks.size);
[...productLinks.entries()].slice(0, 15).forEach(([h, v]) => console.log(h.split("/").pop(), "::", v.alt, "||", v.src));

// Also find product-name elements
console.log("\nproduct-name:", $(".product-name").length, "| name: first ->", $(".product-name").first().text().trim().slice(0, 80));
console.log("price elements:", $(".price").length, "| first:", $(".price").first().text().trim().slice(0, 40));
