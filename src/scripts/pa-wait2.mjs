const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.log("waiting 180s...");
await sleep(180000);

// fresh minimal request to a URL never requested before
const res = await fetch("https://www.primaryarms.com/shotguns", {
  headers: { "user-agent": UA, accept: "text/html" },
  signal: AbortSignal.timeout(30000),
});
const html = await res.text();
const cheerio = await import("cheerio");
const $ = cheerio.load(html);
console.log("status:", res.status, "len:", html.length);
console.log("cards:", $("a.show-details-redirect").length);
console.log("is shell:", html.includes("shopping.environment.ssp") && html.length < 20000);
