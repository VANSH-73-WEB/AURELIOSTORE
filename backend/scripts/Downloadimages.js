// Downloads a real photo for each product into:
// Frontend/public/products/items/
//
// Priority:
// 1. Existing local image -> keep it
// 2. DummyJSON matched image
// 3. Product's existing Unsplash image
//
// Usage:
//   cd backend
//   node scripts/Downloadimages.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { products, fetchRealImages } from "../products.js";

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../Frontend/public/products/items"
);

fs.mkdirSync(dir, { recursive: true });

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const exists = (slug) =>
  fs
    .readdirSync(dir)
    .some((f) => f.startsWith(slug + "."));

/*
|--------------------------------------------------------------------------
| Download helper
|--------------------------------------------------------------------------
*/

async function downloadImage(url, filePath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";

  // Don't save HTML as an image
  if (contentType.includes("text/html")) {
    throw new Error(`Invalid image response: ${contentType}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());

  if (!buffer.length) {
    throw new Error("Empty image");
  }

  fs.writeFileSync(filePath, buffer);
}

/*
|--------------------------------------------------------------------------
| Get extension from response/content URL
|--------------------------------------------------------------------------
*/

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();

    if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
      return ".jpg";
    }

    if (pathname.endsWith(".png")) {
      return ".png";
    }

    if (pathname.endsWith(".webp")) {
      return ".webp";
    }

    if (pathname.endsWith(".avif")) {
      return ".avif";
    }
  } catch {
    // ignore
  }

  return ".jpg";
}

/*
|--------------------------------------------------------------------------
| Main
|--------------------------------------------------------------------------
*/

const realImages = await fetchRealImages(products);

let saved = 0;
let skipped = 0;
let failed = [];

for (const [i, product] of products.entries()) {
  const slug = slugify(product.title);

  /*
  |--------------------------------------------------------------------------
  | Keep existing images
  |--------------------------------------------------------------------------
  */

  if (exists(slug)) {
    console.log("exists", slug);
    skipped++;
    continue;
  }

  /*
  |--------------------------------------------------------------------------
  | First choice: DummyJSON matched image
  |--------------------------------------------------------------------------
  */

  let imageUrl = realImages[i];

  /*
  |--------------------------------------------------------------------------
  | Second choice: existing Unsplash image from products.js
  |--------------------------------------------------------------------------
  |
  | Your products.js already assigns Unsplash images such as:
  |
  | img.clothingMen
  | img.electronics
  | img.furniture
  |
  | So use that instead of loremflickr.
  |
  */

  if (!imageUrl && product.image?.includes("images.unsplash.com")) {
    imageUrl = product.image;
  }

  /*
  |--------------------------------------------------------------------------
  | No image available
  |--------------------------------------------------------------------------
  */

  if (!imageUrl) {
    console.warn("NO IMAGE:", product.title);
    failed.push(product.title);
    continue;
  }

  /*
  |--------------------------------------------------------------------------
  | Download
  |--------------------------------------------------------------------------
  */

  try {
    const ext = getExtension(imageUrl);
    const filename = slug + ext;
    const filePath = path.join(dir, filename);

    await downloadImage(imageUrl, filePath);

    saved++;

    console.log("saved", filename);
  } catch (error) {
    console.warn(
      "failed",
      product.title,
      error.message
    );

    failed.push(product.title);
  }
}

/*
|--------------------------------------------------------------------------
| Summary
|--------------------------------------------------------------------------
*/

console.log("\n----------------------------------------");
console.log("IMAGE DOWNLOAD COMPLETE");
console.log("----------------------------------------");

console.log(`Downloaded: ${saved}`);
console.log(`Already existed: ${skipped}`);
console.log(`Failed: ${failed.length}`);

console.log(`\nFolder:\n${dir}`);

if (failed.length) {
  console.log(
    `\nCould not download images for ${failed.length} products:\n- ` +
      failed.join("\n- ")
  );
}