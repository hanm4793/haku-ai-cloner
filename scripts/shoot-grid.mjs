import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/du-an", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  document.querySelectorAll(".aa-reveal").forEach(e => e.classList.add("is-in"));
});
// scroll grid into view
const grid = await page.locator(".grid > a").first();
await grid.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${outDir}/grid-default.png` });
// hover the big VCB tile
await grid.hover();
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/grid-hover-vcb.png` });
// hover sonha (7th tile)
const son = await page.locator(".grid > a").nth(6);
await son.scrollIntoViewIfNeeded();
await son.hover();
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/grid-hover-sonha.png` });
console.log("done");
await browser.close();
