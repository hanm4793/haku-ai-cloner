import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
  document.querySelectorAll(".aa-reveal").forEach(e => e.classList.add("is-in"));
});
await page.waitForTimeout(1200);
await page.screenshot({ path: `${outDir}/home2-full.png`, fullPage: true });
console.log("done");
await browser.close();
