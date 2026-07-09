import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const max = await page.evaluate(() => document.body.scrollHeight - innerHeight);
for (const [name, off] of [["mid", 350], ["end", 0]]) {
  await page.evaluate(y => window.scrollTo(0, y), max - off);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/f2-${name}.png` });
  console.log(name);
}
await browser.close();
