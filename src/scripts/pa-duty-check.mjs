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

async function probe(url, delay = 1500) {
  await sleep(delay);
  try {
    const res = await fetch(url, { headers: HDRS, signal: AbortSignal.timeout(30000) });
    const html = await res.text();
    const $ = cheerio.load(html);
    const cards = $("a.show-details-redirect").length;
    const shell = html.includes("shopping.environment.ssp") && html.length < 20000;
    console.log(
      res.status,
      "len=" + html.length,
      "cards=" + cards,
      shell ? "SHELL" : "SSR",
      url.replace("https://www.primaryarms.com", "")
    );
  } catch (e) {
    console.log("ERR", url, e.message);
  }
}

// Brand new URLs that were never hit
await probe("https://www.primaryarms.com/optics");
await probe("https://www.primaryarms.com/ammunition");
await probe("https://www.primaryarms.com/gun-cases");
