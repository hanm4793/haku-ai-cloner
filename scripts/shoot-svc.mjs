import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/dich-vu", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  document.querySelectorAll(".aa-reveal").forEach(e => e.classList.add("is-in"));
});
// scroll to first service panel
const arts = page.locator("article");
await arts.nth(0).scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/svc-row1.png` });
// mid-stack: scroll so panel 3 overlaps 2 (stacking visible)
const y3 = await page.evaluate(() => {
  const a = document.querySelectorAll("article")[2];
  return a.getBoundingClientRect().top + window.scrollY;
});
await page.evaluate(y => window.scrollTo(0, y - 400), y3);
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/svc-stack.png` });
console.log("done");
await browser.close();
