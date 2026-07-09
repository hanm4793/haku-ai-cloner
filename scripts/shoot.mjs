import { chromium } from "playwright";
const outDir = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
for (const [name, path] of [["home","/"],["dichvu","/dich-vu"],["duan","/du-an"],["lienhe","/lien-he"]]) {
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
  // scroll through to trigger lazy images + reveals
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
    document.querySelectorAll(".aa-reveal").forEach(e => e.classList.add("is-in"));
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true });
  console.log(name, "done");
}
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.click('button[aria-label="Mở menu"]');
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/menu.png` });
console.log("menu done");
await browser.close();
