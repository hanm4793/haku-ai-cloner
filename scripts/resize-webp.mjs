import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const targetWidth = Number(process.argv[3] || 1920);
const removeOriginal = process.argv.includes("--rm");

if (!dir) {
  console.error("Usage: node scripts/resize-webp.mjs <dir> [width] [--rm]");
  process.exit(1);
}

const exts = new Set([".png", ".jpg", ".jpeg"]);
const files = readdirSync(dir).filter((f) => exts.has(path.extname(f).toLowerCase()));

for (const file of files) {
  const src = path.join(dir, file);
  const out = path.join(dir, `${path.basename(file, path.extname(file))}.webp`);
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  const outMeta = await sharp(out).metadata();
  const inKB = (statSync(src).size / 1024).toFixed(0);
  const outKB = (statSync(out).size / 1024).toFixed(0);
  console.log(
    `${file} (${meta.width}x${meta.height}, ${inKB}KB) -> ${path.basename(out)} (${outMeta.width}x${outMeta.height}, ${outKB}KB)`
  );
  if (removeOriginal) unlinkSync(src);
}

console.log(`\nDone: ${files.length} file(s).`);
