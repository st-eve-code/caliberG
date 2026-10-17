import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const HDRS = {
  "user-agent": UA,
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
  "sec-ch-ua": '"Not/A)Brand";v="99", "Google Chrome";v="126", "Chromium";v="126"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchSsrt(url, maxTries = 6) {
  for (let i = 1; i <= maxTries; i++) {
    try {
      const res = await fetch(url, {
        headers: HDRS,
        signal: AbortSignal.timeout(30000),
      });
      const html = await res.text();
      const shell = html.includes("shopping.environment.ssp") && html.length < 20000;
      if (!shell && html.length > 20000) {
        return html;
      }
      console.log(`  try ${i}: shell (len ${html.length})`);
    } catch (e) {
      console.log(`  try ${i}: err ${e.message}`);
    }
    await sleep(6000);
  }
  return null;
}

const url = "https://www.primaryarms.com/duty-gear";
console.log("fetching duty-gear...");
const html = await fetchSsrt(url);
if (!html) {
  console.log("failed");
  process.exit(1);
}
writeFileSync("scripts/pa-duty-ssr.html", html);
const $ = cheerio.load(html);
const cards = $("a.show-details-redirect").length;
console.log("cards:", cards);

// Extract all category-ish links (subcategories) from the page
const seen = new Set();
const links = [];
$("a[href]").each((_, el) => {
  const href = $(el).attr("href") || "";
  const txt = $(el).text().trim().replace(/\s+/g, " ").slice(0, 50);
  if (seen.has(href)) return;
  seen.add(href);
  if (/^\/[a-z0-9][a-z0-9-]*\/?$/.test(href)) {
    links.push({ href, txt });
  }
});
writeFileSync("scripts/pa-duty-links.json", JSON.stringify(links, null, 1));
console.log("links with text:");
links
  .filter((l) => l.txt)
  .slice(0, 80)
  .forEach((l) => console.log(`  ${l.href} :: ${l.txt}`));
