import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const width = Number(process.argv[3] || 390);
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const q = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1), mid: +((r.top + r.bottom) / 2).toFixed(1) };
  };
  const header = document.querySelector("header > div");
  const logo = header?.querySelector("a");
  const cluster = header?.querySelectorAll(":scope > div")[0];
  const burger = header?.querySelector("button");
  const lienhe = header?.querySelector("a[href='/lien-he']");
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1), mid: +((r.top + r.bottom) / 2).toFixed(1) };
  };
  return {
    headerInner: box(header),
    logo: box(logo),
    cluster: box(cluster),
    burger: box(burger),
    lienhe: box(lienhe),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
