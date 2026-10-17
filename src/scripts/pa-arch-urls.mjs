import { readFileSync } from "node:fs";

const html = readFileSync("scripts/pa-archive-duty_gear_2022.html", "utf8");

// SCA loads products via an itemslist search URL. Find all URLs/query strings in the archive
const re = /(https?:\/\/[^"'\s<>]+|"[^"]*search[^"]*")/g;
const found = new Set();
let m;
while ((m = re.exec(html)) !== null) {
  const s = m[1];
  if (s.includes("primaryarms.com") || s.includes("search") || s.includes("ssp")) {
    found.add(s.slice(0, 200));
  }
}
console.log("--- urls with search/ssp ---");
[...found].slice(0, 40).forEach((s) => console.log(s));

// find "url.secure" / "url.tenants" style config or Commerce endpoints
for (const kw of ["surl", "url.secure", "url.tenants", "searchKey", "api", "itemslist", "facet", "q="]) {
  let i = html.indexOf(kw);
  if (i > -1) console.log(`\n${kw} @ ${i}:`, html.slice(i, i + 300).replace(/\s+/g, " "));
}
