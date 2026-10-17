import { readFileSync, writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const html = readFileSync("scripts/pa-archive-suppressors.html", "utf8");
const $ = cheerio.load(html);

// Collect all JSON-LD blocks
const blocks = [];
$('script[type="application/ld+json"]').each((_, el) => blocks.push($(el).text()));
console.log("jsonld blocks:", blocks.length);
writeFileSync("scripts/pa-jsonld.txt", blocks.join("\n\n---\n\n"));

// Show size of first block
if (blocks.length) console.log("first block len:", blocks[0].length);
