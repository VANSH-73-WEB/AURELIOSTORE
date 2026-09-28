// Downloads a real photo for each product into Frontend/public/products/items/
// (one file per product, named by slug - the seed picks them up automatically).
// Photos come from the free DummyJSON catalogue, matched by product name.
// Products with no match (e.g. Kids items) are listed at the end - add those
// yourself from Pinterest using the names in FILENAMES.txt.
//
// Usage (needs internet, Node 18+):
//   cd backend && node scripts/downloadImages.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { products, fetchRealImages } from "../products.js";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../Frontend/public/products/items");
fs.mkdirSync(dir, { recursive: true });
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const exists = (slug) => fs.readdirSync(dir).some((f) => f.startsWith(slug + "."));

// Fallback for products DummyJSON has nothing for: a real Flickr photo tagged with the
// product's key words (loremflickr.com, no key needed). Relevance can vary, so
// glance through the folder afterwards and swap any wrong ones.
const STOP = new Set(["set","pro","kit","kids","size","piece","inch","classic","premium","smart","wireless","of","and","the","fabric","door","seater","shelf","fast","mini","sport","adjustable","hydrating","matte","vitamin","face","casual","cotton","embroidered","high","waist","slim","fit","formal","summer","party","black","white"]);
const keywords = (title) => {
  const w = title.toLowerCase().replace(/[^a-z\s-]/g, " ").split(/[\s-]+/).filter((x) => x.length > 2 && !STOP.has(x));
  return (w.slice(-2).join(",") || "product");
};
const urls = await fetchRealImages(products);
products.forEach((p, i) => {
  if (!urls[i]) urls[i] = `https://loremflickr.com/800/800/${encodeURIComponent(keywords(p.title))}?lock=${i + 1}`;
});
const missing = [];
let saved = 0;

for (const [i, p] of products.entries()) {
  const slug = slugify(p.title);
  if (exists(slug)) continue; // keep photos you already added
  const url = urls[i];
  if (!url) { missing.push(p.title); continue; }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ext = (path.extname(new URL(url).pathname) || ".webp").toLowerCase();
    fs.writeFileSync(path.join(dir, slug + ext), Buffer.from(await res.arrayBuffer()));
    saved++;
    console.log("saved", slug + ext);
  } catch (e) {
    console.warn("failed", p.title, e.message);
    missing.push(p.title);
  }
}
console.log(`\nDownloaded ${saved} photos to ${dir}`);
if (missing.length) console.log(`\nCould not download a photo for ${missing.length} products (add these yourself):\n- ` + missing.join("\n- "));