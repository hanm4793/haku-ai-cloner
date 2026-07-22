import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/vcb";
const base = process.argv[3] || "http://localhost:3000";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + "/du-an/vietcombank", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 140));
  }
  window.scrollTo(0, 0);
  document.querySelectorAll(".aa-reveal").forEach((e) => e.classList.add("is-in"));
});
await page.waitForTimeout(1500);
await page.screenshot({ path: `${outDir}/vietcombank-full.png`, fullPage: true });
console.log("vietcombank full done");
await browser.close();
