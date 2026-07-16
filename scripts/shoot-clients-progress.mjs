import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/clients-progress";
const base = process.argv[3] || "http://localhost:3005";
const w = 1440, h = 900;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(1200);
const top = await page.evaluate(() => {
  const secs = Array.from(document.querySelectorAll("section"));
  const target = secs.find((s) => s.className.includes("170vh"));
  return target ? target.getBoundingClientRect().top + window.scrollY : -1;
});
// rect.top values (in vh) to sample the reveal progression
const rectTops = [0.35, 0.15, 0.0, -0.2, -0.4, -0.6];
let i = 0;
for (const rt of rectTops) {
  const y = Math.round(top - rt * h);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/step-${i}-rt${rt}.png` });
  i++;
}
console.log(`done ${i} steps, section top=${top}`);
await browser.close();
