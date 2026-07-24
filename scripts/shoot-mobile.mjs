import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/mobile";
const base = process.argv[3] || "http://localhost:3000";
const width = Number(process.argv[4] || 390);
const path = process.argv[5] || "/";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(base + path, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3500);

// Full page screenshot
await page.screenshot({ path: `${outDir}/full-${width}.png`, fullPage: true });

// Above-the-fold (first screen) screenshot
await page.screenshot({ path: `${outDir}/fold-${width}.png`, fullPage: false });

console.log(`shot ${path} @ ${width} -> ${outDir}`);
await browser.close();
