import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(30000),
  });
  const t = await res.text();
  return { status: res.status, t, len: t.length };
}

// SFCC endpoints
const tests = [
  "https://www.primaryarms.com/on/demandware.store/Sites-PrimaryArms-Site/default/Search-UpdateGrid?cgid=suppressors&start=0&sz=24",
  "https://www.primaryarms.com/on/demandware.store/Sites-PrimaryArms-Site/default/Search-UpdateGrid?cgid=duty-gear&start=0&sz=24",
  "https://www.primaryarms.com/on/demandware.store/Sites-PrimaryArms-Site/default/Search-Show?cgid=suppressors",
];

for (const u of tests) {
  const { status, t, len } = await getJson(u);
  const $ = cheerio.load(t);
  const cards = $("a.show-details-redirect").length;
  console.log(status, "len", len, "cards", cards, u.slice(-80));
  // look for category id in the response
  const cid = t.match(/(?:cgid|categoryid|category)\D{0,20}?([a-z0-9-]{3,40})/gi);
  if (cid) console.log("  cid hints:", cid.slice(0, 5));
  await sleep(4000);
}
