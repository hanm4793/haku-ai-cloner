import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// scroll hard to bottom
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
const topMark = await page.evaluate(() => document.querySelector("footer").getBoundingClientRect().top);
await page.screenshot({ path: `${outDir}/f4-bottom.png` });
console.log("at-bottom footer.top:", topMark);
// simulate overscroll wheel at bottom
await page.mouse.move(960, 600);
for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(60); }
await page.waitForTimeout(500);
const topMark2 = await page.evaluate(() => document.querySelector("footer").getBoundingClientRect().top);
await page.screenshot({ path: `${outDir}/f4-overscroll.png` });
console.log("after-overscroll footer.top:", topMark2, "(must equal)");
await browser.close();
