import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/desktop-shots";
const base = process.argv[3] || "http://localhost:3005";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(1200);
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
  window.scrollTo(0, 0);
  document.querySelectorAll(".aa-reveal").forEach((e) => e.classList.add("is-in"));
});
await page.waitForTimeout(600);
const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += 900) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${outDir}/d-${String(i).padStart(2, "0")}.png` });
  i++;
}
console.log(`desktop: ${i} slices`);
await browser.close();
