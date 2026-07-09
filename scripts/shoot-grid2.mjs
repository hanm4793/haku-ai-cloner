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
const tiles = page.locator(".grid > a");
// default view of lower grid (sonha/viettheatre/vna rows)
await tiles.nth(6).scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${outDir}/g2-default.png` });
for (const [name, idx] of [["vna", 7], ["kizciti", 4], ["viettheatre", 5]]) {
  await tiles.nth(idx).scrollIntoViewIfNeeded();
  await tiles.nth(idx).hover();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/g2-hover-${name}.png` });
  console.log(name);
}
await browser.close();
