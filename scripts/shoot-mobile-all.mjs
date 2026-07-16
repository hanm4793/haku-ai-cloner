import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] || "temp/mobile-shots";
const base = process.argv[3] || "http://localhost:3000";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

const pages = [
  ["m-home", "/"],
  ["m-dichvu", "/dich-vu"],
  ["m-duan", "/du-an"],
  ["m-lienhe", "/lien-he"],
];

for (const [name, path] of pages) {
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll(".aa-reveal").forEach((e) => e.classList.add("is-in"));
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  console.log(name);
}

await page.goto(base + "/", { waitUntil: "load" });
await page.waitForTimeout(1000);
try {
  await page.click('button[aria-label="Mở menu"]', { timeout: 3000 });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outDir}/m-menu.png` });
  console.log("m-menu");
} catch {
  console.log("m-menu: no menu button found");
}

await browser.close();
