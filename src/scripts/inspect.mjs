import { readFileSync } from "node:fs";
import * as cheerio from "cheerio";

const html = readFileSync("br-guns.html", "utf8");
const $ = cheerio.load(html);

console.log("=== count .pl-item ===", $(".pl-item").length);

const item = $(".pl-item").first();
console.log("\n=== FIRST .pl-item HTML (truncated) ===");
console.log($.html(item).slice(0, 4000));

console.log("\n=== .pl-item links ===");
$(".pl-item a[href]").each((_, el) => {
  console.log("  " + $(el).attr("href") + " :: " + $(el).text().trim().slice(0, 60));
});

console.log("\n=== .pl-item images ===");
$(".pl-item img").each((_, el) => {
  console.log("  " + ($(el).attr("src") || $(el).attr("data-src")));
});
