const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const qs = "lang=en_US&limit=24&offset=0&pricelevel=5&sort=custitem_ns_sc_ext_ts_365_amount%3Adesc";
const urls = [
  `https://www.primaryarms.com/search.ssp?${qs}`,
  `https://www.primaryarms.com/api/catalog/search?q=suppressor`,
  `https://www.primaryarms.com/app/site/hosting/scriptlet.nl?script=search`,
];

for (const url of urls) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "application/json,text/html" },
      signal: AbortSignal.timeout(30000),
    });
    const t = await res.text();
    console.log(res.status, "len:", t.length, url.split("/").pop().split("?")[0]);
    console.log("  head:", t.replace(/\s+/g, " ").slice(0, 150));
  } catch (e) {
    console.log("ERR", url, e.message);
  }
  await sleep(5000);
}
