import { readFileSync } from "node:fs";
import * as cheerio from "cheerio";

const html = readFileSync("scripts/pa-archive-duty_gear_2022.html", "utf8");
const $ = cheerio.load(html);

// inspect the item elements
const items = $("[class*='item']");
console.log("item count:", items.length);
items.slice(0, 3).each((_, el) => {
  console.log("---");
  console.log($.html(el).replace(/\s+/g, " ").slice(0, 600));
});

// look for product data attributes
console.log("\ndata-pid:", $("[data-pid]").length);
console.log("data-id:", $("[data-id]").length);
console.log("product-id:", $("[data-product-id]").length);

// any script with "products" array?
$("script").each((_, el) => {
  const t = ($(el).text() || "").slice(0, 200);
  if (/products?\s*:/i.test(t) || /itemId|productId/i.test(t)) {
    console.log("script hint:", t.slice(0, 150));
  }
});
