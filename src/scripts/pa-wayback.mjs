const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdx(url) {
  const api = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(
    url
  )}&output=json&filter=statuscode:200&filter=mimetype:text/html&collapse=digest&limit=5`;
  const res = await fetch(api, { signal: AbortSignal.timeout(30000) });
  const t = await res.text();
  try {
    const rows = JSON.parse(t);
    return rows.slice(1).map((r) => ({
      ts: r[1],
      url: `https://web.archive.org/web/${r[1]}/${url}`,
    }));
  } catch {
    return [];
  }
}

for (const u of [
  "https://www.primaryarms.com/suppressors",
  "https://www.primaryarms.com/duty-gear",
  "https://www.primaryarms.com/black-powder",
  "https://www.primaryarms.com/holsters",
]) {
  const snaps = await cdx(u);
  console.log(u, "=>", snaps.length ? snaps.map((s) => s.ts).join(", ") : "none");
  await sleep(2000);
}
