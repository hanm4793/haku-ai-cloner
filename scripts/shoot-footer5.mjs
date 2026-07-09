import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/f5-initial.png` });
await page.mouse.move(960, 600);
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(60); }
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/f5-mid.png` });
for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(60); }
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/f5-end.png` });
console.log("done");
await browser.close();
