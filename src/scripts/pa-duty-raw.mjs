const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const res = await fetch("https://www.primaryarms.com/duty-gear", {
  headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
});
const html = await res.text();
console.log(html.slice(0, 3000));
