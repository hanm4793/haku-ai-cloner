import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/sections";
const base = process.argv[3] || "http://localhost:3000";
const width = Number(process.argv[4] || 390);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += 800) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/s${String(i).padStart(2, "0")}.png` });
  i++;
}
console.log(`captured ${i} sections, total height ${total}`);
await browser.close();
