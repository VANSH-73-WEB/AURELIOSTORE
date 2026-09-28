// One-off maintenance script: finds products whose title clearly doesn't
// match their stored category (e.g. "Motorcycle Helmet" filed under
// Footwear > Men, or "JBL Tune 750BTNC" filed under Footwear instead of
// Electronics/Wearables) and re-files them into the right section.
//
// This is exactly the "wrong products/images showing up in a category"
// problem - it's a data issue, not something a code change to the storefront
// can fix on its own, so this has to be run against your actual database.
//
// Usage:
//   cd backend
//   node scripts/recategorizeProducts.js            # dry run - just prints what it WOULD change
//   node scripts/recategorizeProducts.js --apply     # actually saves the changes
//
// Keyword -> category/subCategory map. Add to this list if your catalog has
// other obviously-misfiled products; keywords are matched case-insensitively
// against the product title.
const RULES = [
  { keywords: ["helmet", "motorcycle", "riding jacket", "car ", "tyre", "tire"], category: "Automobile" },
  { keywords: ["headphone", "earbud", "speaker", "jbl", "boat ", "laptop", "mouse", "keyboard", "monitor", "hard disk", "hard drive", "ssd", "processor", "webcam", "pen drive", "power bank", "charger", "cable"], category: "Electronics" },
  { keywords: ["perfume", "cologne", "eau de", "fragrance", "deodorant", "body spray"], category: "Fragrances" },
  { keywords: ["lipstick", "foundation", "mascara", "skincare", "moisturizer", "sunscreen", "makeup"], category: "Beauty & Personal Care" },
  { keywords: ["dumbbell", "yoga mat", "treadmill", "protein", "gym bag", "resistance band"], category: "Sports & Fitness" },
  { keywords: ["novel", "notebook", "diary", "pen set", "textbook", "stationery"], category: "Books & Stationery" },
  { keywords: ["lego", "action figure", "puzzle", "board game", "toy car", "stuffed"], category: "Toys & Games" },
  { keywords: ["smartwatch", "fitness band", "fitbit"], category: "Wearables" },
  { keywords: ["sofa", "chair", "table", "bed frame", "wardrobe", "mattress"], category: "Furniture" },
  { keywords: ["sneaker", "sandal", "boot", "loafer", "heels", "flip-flop"], category: "Footwear" },
  { keywords: ["utensil", "cutlery", "spatula", "frying pan", "cookware", "pressure cooker", "dinner set", "storage jar", "chef's knife", "knife set"], category: "Kitchen & Dining" },
  { keywords: ["phone holder", "phone stand", "laptop stand", "wallet", "belt", "sunglasses", "cap", "handbag", "backpack"], category: "Accessories" },
];

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const apply = process.argv.includes("--apply");

const matchRule = (title) => {
  const lower = title.toLowerCase();
  return RULES.find((rule) => rule.keywords.some((kw) => lower.includes(kw)));
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected. Mode: ${apply ? "APPLYING CHANGES" : "DRY RUN (pass --apply to save)"}\n`);

  const products = await Product.find({}).select("title category subCategory").lean();
  let changes = 0;

  for (const product of products) {
    const rule = matchRule(product.title);
    if (!rule) continue;
    if (rule.category === product.category) continue; // already correct

    changes++;
    console.log(
      `"${product.title}"  ${product.category}${product.subCategory ? "/" + product.subCategory : ""}  ->  ${rule.category}`
    );

    if (apply) {
      // Category families that don't have Men/Women/Kids sub-sections should
      // have subCategory cleared, since it no longer means anything there.
      const clearsSub = !["Clothing", "Footwear"].includes(rule.category);
      await Product.updateOne(
        { _id: product._id },
        { $set: { category: rule.category, ...(clearsSub ? { subCategory: "" } : {}) } }
      );
    }
  }

  console.log(`\n${changes} product(s) ${apply ? "updated" : "would be updated"}.`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
