// Downloads all Zeit Media assets to public/. Run: node scripts/download-assets.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const WF = "https://cdn.prod.website-files.com/68b811bfb18d63df71dcda99/";
const CMS = "https://cdn.prod.website-files.com/68c669fdfded2a0038b3e8e8/";
const CDN = "https://zeit.b-cdn.net/";

const assets = [
  // Fonts
  [WF + "68b8fa94bcb080090e1ea3f4_InterDisplay-Light.woff2", "public/fonts/InterDisplay-Light.woff2"],
  [WF + "68b8fa94b4ba3d24853d42e5_InterDisplay-Regular.woff2", "public/fonts/InterDisplay-Regular.woff2"],
  [WF + "68b8fa9416ba48fe016158cc_InterDisplay-Medium.woff2", "public/fonts/InterDisplay-Medium.woff2"],
  [WF + "68b8fa94f9193241eb1e6ed2_InterDisplay-SemiBold.woff2", "public/fonts/InterDisplay-SemiBold.woff2"],
  // Favicons
  [WF + "68b8196a197a58eec4194167_favicon.jpg", "public/seo/favicon.jpg"],
  [WF + "68b8196ccdeb43caf641e666_webclip.jpg", "public/seo/webclip.jpg"],
  [WF + "68b811c1b18d63df71dcdb3d_b6380c74797705e6321ab3802d42210e_open-graph-image.jpg", "public/seo/og-image.jpg"],
  // Hero / about
  [CMS + "6a3910d8e021995a7fd22b09_Zeit_B2011423.jpg", "public/images/hero-orchestra.jpg"],
  // Differentiator media
  [WF + "68c8f23224ac0da127d2d801_Rectangle%2038.avif", "public/images/diff-rect38.avif"],
  [WF + "68c8f23224ac0da127d2d803_image%201113.avif", "public/images/diff-1113.avif"],
  [WF + "692f05c4b38ee040469f3443_main.avif", "public/images/diff-main.avif"],
  [WF + "6928001b98c98b15b48a12d5_haniff%201.avif", "public/images/diff-haniff.avif"],
  [WF + "68ee3aa36df1cc984c221657_parallax.avif", "public/images/parallax.avif"],
  [WF + "68c908f0335bcd7b98cb852d_image%20113.avif", "public/images/diff-113.avif"],
  // Services
  [WF + "68d67020885f73c3326608fe_events.avif", "public/images/svc-events.avif"],
  [WF + "68d670207078d1331688e8ac_marcom.avif", "public/images/svc-marcom.avif"],
  [WF + "68d670202730f6dc9e99a380_CD.avif", "public/images/svc-cd.avif"],
  [WF + "68d67020333b7248b8860fbf_production.avif", "public/images/svc-production.avif"],
  // Project cards
  [CMS + "69c6422bc817f7dd7090fa30_z7663752742939_6761b641fe2c6af974010ccfebdb969f%20(1).webp", "public/images/proj-petrolimex.webp"],
  [CMS + "6985aaadecbef9b345b85e95_F1090497%20(1)%20(1).jpg", "public/images/proj-dang.jpg"],
  [CMS + "691e117fe3f9d636a04d2d86_z7156631364795_53c865ad0c0e608f5fd3ec24e2311fd3-min.avif", "public/images/proj-hanoi.avif"],
  [CMS + "691d7798bbe72104cbb57d05_503229610_122108103626885664_7718728219984834969_n.avif", "public/images/proj-chiensi.avif"],
  [CMS + "6911c00e60f54aec498d521a_VTB_KVTVC(1920x1080)-min.webp", "public/images/proj-vietinbank.webp"],
  [CMS + "691cafb54d9be3f2223f6e49_B%E1%BA%A3n%20sao%20c%E1%BB%A7a%20BUDD4811.avif", "public/images/proj-trienlam.avif"],
  // Videos
  [CDN + "COVER%20FINAL%202.mp4", "public/videos/hero-cover.mp4"],
  [CDN + "3d-zeit.mp4", "public/videos/3d-zeit.mp4"],
];

async function get(url, dest) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    console.log(`OK   ${dest} (${(buf.length / 1024).toFixed(0)}kb)`);
  } catch (e) {
    console.error(`FAIL ${dest} <- ${url} :: ${e.message}`);
  }
}

for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(([u, d]) => get(u, d)));
}
console.log("done");
