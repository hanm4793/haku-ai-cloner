import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/vcb";
const base = process.argv[3] || "http://localhost:3000";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + "/du-an/vietcombank", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2000);
const nav = page.locator("#project-nav");
await nav.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await nav.screenshot({ path: `${outDir}/nav-default.png` });

const next = page.getByRole("link", { name: "Next" });
await next.hover();
await page.waitForTimeout(700);
await nav.screenshot({ path: `${outDir}/nav-hover.png` });
console.log("nav done");
await browser.close();
