import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const HDRS = {
  "user-agent": UA,
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Get session cookies from homepage
const homeRes = await fetch("https://www.primaryarms.com/", {
  headers: HDRS,
  redirect: "follow",
});
const setCookies = homeRes.headers.getSetCookie?.() || [];
console.log("home status:", homeRes.status, "cookies:", setCookies.map((c) => c.split(";")[0]));
const cookie = setCookies.map((c) => c.split(";")[0]).join("; ");

// 2. Now fetch category with the session cookie
await sleep(5000);
const res = await fetch("https://www.primaryarms.com/suppressors", {
  headers: { ...HDRS, cookie, "sec-fetch-dest": "document", "sec-fetch-mode": "navigate", "sec-fetch-site": "same-origin" },
});
const html = await res.text();
console.log("category status:", res.status, "len:", html.length);
const $ = cheerio.load(html);
console.log("cards:", $("a.show-details-redirect").length);
console.log("is shell:", html.includes("shopping.environment.ssp") && html.length < 20000);
writeFileSync("scripts/pa-session.html", html);
