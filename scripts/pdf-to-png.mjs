import { pdf } from "pdf-to-img";
import { writeFileSync, mkdirSync } from "node:fs";

const src = process.argv[2];
const outDir = process.argv[3] || "temp/pdf-pages";
mkdirSync(outDir, { recursive: true });

const doc = await pdf(src, { scale: 2 });
let i = 1;
for await (const page of doc) {
  writeFileSync(`${outDir}/page-${String(i).padStart(2, "0")}.png`, page);
  console.log(`page-${i}`);
  i++;
}
