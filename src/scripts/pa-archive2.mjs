import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SNAPS = {
  suppressors_2022: "https://web.archive.org/web/20220704025456/https://www.primaryarms.com/suppressors",
  duty_gear_2022: "https://web.archive.org/web/20221229210141/https://www.primaryarms.com/duty-gear",
};

for (const [key, url] of Object.entries(SNAPS)) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(90000),
    });
    const html = await res.text();
    console.log(key, "status:", res.status, "len:", html.length);
    writeFileSync(`scripts/pa-archive-${key}.html`, html);
    const $ = cheerio.load(html);
    console.log("  cards:", $("a.show-details-redirect").length);
    // check product name patterns
    console.log("  product-name:", $(".product-name").length, "price:", $(".price").length, "item:", $("[class*='item']").length);
    const first = $(".product-name").first();
    if (first.length) console.log("  first name:", first.text().trim().slice(0, 80));
    await sleep(3000);
  } catch (e) {
    console.log(key, "ERR", e.message);
  }
}
