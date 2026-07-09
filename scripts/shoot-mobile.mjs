import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const [name, path] of [["m-home","/"],["m-duan","/du-an"]]) {
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
    document.querySelectorAll(".aa-reveal").forEach(e => e.classList.add("is-in"));
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  console.log(name);
}
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.click('button[aria-label="Mở menu"]');
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/m-menu.png` });
console.log("m-menu");
await browser.close();
