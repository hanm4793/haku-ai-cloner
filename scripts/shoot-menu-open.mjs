import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/menu-check";
const base = process.argv[3] || "http://localhost:3005";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const [tag, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(base + "/", { waitUntil: "load" });
  await page.waitForTimeout(1000);
  await page.click('button[aria-label="Mở menu"]');
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outDir}/menu-open-${tag}.png` });
  console.log(`menu-open-${tag}`);
  await page.close();
}
await browser.close();
