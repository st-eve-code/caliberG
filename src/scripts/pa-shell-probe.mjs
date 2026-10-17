const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const res = await fetch("https://www.primaryarms.com/duty-gear", {
  headers: { "user-agent": UA },
});
const html = await res.text();
console.log("len:", html.length);

// Look for any JSON data blobs, api endpoints, or category ids
const patterns = [
  /(https:[^"'\s]*?\.ssp[^"'\s]*)/g,
  /(https:[^"'\s]*?\/api\/[^"'\s]*)/g,
  /"categoryId"\s*:\s*"?\d+/gi,
  /(?:category|cat)\s*[=:]\s*"?\d+/gi,
  /search\.ssp/gi,
  /Commerce[^"'\s]*/g,
];
for (const p of patterns) {
  const matches = html.match(p);
  if (matches) console.log(p.source, "=>", [...new Set(matches)].slice(0, 10));
}

// The shopping.environment.ssp endpoint
console.log("has env ssp:", html.includes("shopping.environment.ssp"));
const idx = html.indexOf("shopping.environment.ssp");
if (idx > -1) console.log(html.slice(idx - 200, idx + 300).replace(/\s+/g, " "));
