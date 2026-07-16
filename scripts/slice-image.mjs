import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const src = process.argv[2];
const outDir = process.argv[3] || "temp/pdf-slices";
const tag = process.argv[4] || path.basename(src, path.extname(src));
const sliceH = Number(process.argv[5] || 900);
mkdirSync(outDir, { recursive: true });

const b64 = readFileSync(src).toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setContent(
  `<body style="margin:0"><img id="i" src="data:image/png;base64,${b64}" style="display:block;width:900px"></body>`
);
await page.waitForSelector("#i");
const dims = await page.evaluate(() => {
  const i = document.getElementById("i");
  return { w: i.clientWidth, h: i.clientHeight };
});
await page.setViewportSize({ width: dims.w, height: Math.min(dims.h, 16000) });
let idx = 0;
for (let y = 0; y < dims.h; y += sliceH) {
  const h = Math.min(sliceH, dims.h - y);
  await page.screenshot({
    path: `${outDir}/${tag}-${String(idx).padStart(2, "0")}.png`,
    clip: { x: 0, y, width: dims.w, height: h },
  });
  idx++;
}
console.log(`${tag}: ${idx} slices from ${dims.w}x${dims.h}`);
await browser.close();
