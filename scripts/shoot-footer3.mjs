import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const max = await page.evaluate(() => document.body.scrollHeight - innerHeight);
const spacer = 0.7 * 1080;
for (const [name, off] of [["pin-start", spacer], ["pin-mid", spacer/2], ["pin-end", 0]]) {
  await page.evaluate(y => window.scrollTo(0, y), max - off);
  await page.waitForTimeout(800);
  // measure gap under footer
  const gap = await page.evaluate(() => {
    const f = document.querySelector("footer > div");
    return innerHeight - f.getBoundingClientRect().bottom;
  });
  await page.screenshot({ path: `${outDir}/f3-${name}.png` });
  console.log(name, "gap-below:", gap);
}
await browser.close();
