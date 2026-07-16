import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/mobile-shots";
const base = process.argv[3] || "http://localhost:3005";
const path = process.argv[4] || "/";
const tag = process.argv[5] || "home";
mkdirSync(outDir, { recursive: true });

const VW = 390;
const VH = 844;
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: VW, height: VH },
  deviceScaleFactor: 2,
});

await page.goto(base + path, { waitUntil: "load" });
await page.waitForTimeout(1000);
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
  document.querySelectorAll(".aa-reveal").forEach((e) => e.classList.add("is-in"));
});
await page.waitForTimeout(600);

const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += VH) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${outDir}/slice-${tag}-${String(i).padStart(2, "0")}.png` });
  i++;
}
console.log(`${tag}: ${i} slices, total height ${total}`);
await browser.close();
