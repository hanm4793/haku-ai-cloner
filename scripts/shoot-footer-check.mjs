import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = "temp/footer-check";
const base = "http://localhost:3005";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

// Home hero (font-size check)
await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(1000);
await page.evaluate(() => document.querySelectorAll(".aa-reveal").forEach((e) => e.classList.add("is-in")));
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/home-hero.png` });

// PreFooter (arrows + Kết nối button) — scroll into view
await page.evaluate(() => {
  const el = [...document.querySelectorAll("a")].find((a) => a.textContent?.includes("Kết nối với ànART"));
  el?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/prefooter.png` });

// Hover the Kết nối button
const btn = page.locator('a:has-text("Kết nối với ànART")').first();
await btn.hover();
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/prefooter-hover.png` });

console.log("done");
await browser.close();
