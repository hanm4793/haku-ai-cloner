import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const top = await page.evaluate(() => {
  const el = [...document.querySelectorAll("section")].find(s => s.className.includes("180vh"));
  return el.getBoundingClientRect().top + window.scrollY;
});
const scrollable = 0.8 * 1080;
for (const p of [0.05, 0.3, 0.6, 1.0]) {
  await page.evaluate(y => window.scrollTo(0, y), top + scrollable * p);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outDir}/cl3-${p}.png` });
  console.log(p);
}
await browser.close();
