import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/clients-check";
const base = process.argv[3] || "http://localhost:3005";
const w = Number(process.argv[4] || 1440);
const h = Number(process.argv[5] || 900);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(1200);
// find the Clients section (h-[130vh]) and scroll so it is pinned & revealed
const top = await page.evaluate(() => {
  const secs = Array.from(document.querySelectorAll("section"));
  const target = secs.find((s) => s.className.includes("130vh"));
  if (!target) return -1;
  return target.getBoundingClientRect().top + window.scrollY;
});
// scroll to pin + ~60vh so reveal is complete
await page.evaluate((y) => window.scrollTo(0, y), top + Math.round(h * 0.6));
await page.waitForTimeout(700);
await page.screenshot({ path: `${outDir}/clients-${w}.png` });
console.log(`clients-${w} (section top=${top})`);
await browser.close();
