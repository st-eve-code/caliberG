import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SNAPS = {
  suppressors: "https://web.archive.org/web/20260310182243/https://www.primaryarms.com/suppressors",
  duty_gear: "https://web.archive.org/web/20230325011858/https://www.primaryarms.com/duty-gear",
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
    const cards = $("a.show-details-redirect").length;
    console.log("  cards:", cards);
    // sample card content
    const first = $("a.show-details-redirect").first();
    console.log("  first anchor text:", (first.text() || "").trim().replace(/\s+/g, " ").slice(0, 120));
    console.log("  first img alt:", (first.find("img").first().attr("alt") || "").slice(0, 80));
    await sleep(3000);
  } catch (e) {
    console.log(key, "ERR", e.message);
  }
}
