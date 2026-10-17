const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(30000) });
  const t = await res.text();
  return { status: res.status, t, len: t.length };
}

for (const u of [
  "https://www.primaryarms.com/sitemap.xml",
  "https://www.primaryarms.com/sitemap_index.xml",
  "https://www.primaryarms.com/sitemapindex.xml",
]) {
  const { status, t, len } = await get(u);
  console.log(u, "=>", status, "len", len, t.slice(0, 150));
  await sleep(4000);
}
