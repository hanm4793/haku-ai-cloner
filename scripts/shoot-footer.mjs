import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const max = await page.evaluate(() => document.body.scrollHeight - innerHeight);
// p=0 (footer just pinned), p=0.5, p=1 (page end); spacer = 0.7*1080 = 756
for (const [name, off] of [["p0", 756], ["p05", 378], ["p1", 0]]) {
  await page.evaluate(y => window.scrollTo(0, y), max - off);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/footer-${name}.png` });
  console.log(name);
}
await browser.close();
