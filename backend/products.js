// import mongoose from "mongoose";
// import Product from "./models/Product.js";

// import dotenv from "dotenv";

// dotenv.config();
// export const products  = [
//   {
//     title: "Headphones",
//     description: "High quality headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/95/ec/d2/95ecd2a566e6d95988f0c826a58e2e9f.jpg",
//     stock: 10,
//     rating: 4,
//     reviews: 52
//   },
//   {
//     title: "Headphones",
//     description: "Premium sound headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/41/94/cc/4194cc021a069c21ecbc86cc7f0ea8b2.jpg",
//     stock: 12,
//     rating: 4,
//     reviews: 52
//   },
//   {
//     title: "Headphones",
//     description: "Wireless headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/8a/48/3b/8a483b00e5d766620d85e2796f7363a4.jpg",
//     stock: 15,
//     rating: 4,
//     reviews: 52
//   },
//   {
//     title: "Headphones",
//     description: "Stylish headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/83/4e/6c/834e6c707cca182aa84c01e43bb0a031.jpg",
//     stock: 8,
//     rating: 4,
//     reviews: 52
//   },
//   {
//     title: "Headphones",
//     description: "Comfortable headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/77/1b/04/771b04b1870705bcd17ff2d498ed1ccb.jpg",
//     stock: 20,
//     rating: 4,
//     reviews: 52
//   },

//   {
//     title: "JBL Tune 750BTNC",
//     description: "Noise cancelling headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/1200x/57/71/2f/57712f7c1014b09b3a76437adb471a98.jpg",
//     stock: 10,
//     rating: 4
//   },
//   {
//     title: "Boat Airdopes 441",
//     description: "Wireless earbuds",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/7f/86/32/7f863225b1359f7427b741e303de7a31.jpg",
//     stock: 25,
//     rating: 4
//   },
//   {
//     title: "AirPods Max",
//     description: "Premium Apple headphones",
//     price: 120,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/f0/46/34/f046340c3e9fa0a558aa6efff32accb0.jpg",
//     stock: 6,
//     rating: 5
//   },
//   {
//     title: "Phone Holder Sakti",
//     description: "Mobile stand holder",
//     price: 29.9,
//     category: "Accessories",
//     image: "https://i.pinimg.com/736x/51/32/e3/5132e35f82fdb47c3aff447b728b3891.jpg",
//     stock: 30
//   },
//   {
//     title: "SONY WH-1000XM6",
//     description: "Sony premium headphones",
//     price: 12,
//     category: "Electronics",
//     image: "https://i.pinimg.com/736x/39/48/ef/3948efa684a8b70aa45d9ab7de99f2bb.jpg",
//     stock: 12,
//     rating: 5
//   },

//   {
//     title: "Smart Fitness Band",
//     description: "Health tracking wearable",
//     price: 49,
//     category: "Wearables",
//     image: "https://via.placeholder.com/300?text=Fitness+Band",
//     stock: 22
//   },
//   {
//     title: "Wireless Gaming Mouse",
//     description: "High precision gaming mouse",
//     price: 64.99,
//     category: "Electronics",
//     image: "https://via.placeholder.com/300?text=Gaming+Mouse",
//     stock: 15
//   },
//   {
//     title: "4K Ultra HD Monitor",
//     description: "High resolution monitor",
//     price: 329,
//     category: "Electronics",
//     image: "https://via.placeholder.com/300?text=4K+Monitor",
//     stock: 5
//   },
//   {
//     title: "Smart WiFi Router",
//     description: "High speed internet router",
//     price: 109.99,
//     category: "Electronics",
//     image: "https://via.placeholder.com/300?text=WiFi+Router",
//     stock: 10
//   },

//   {
//     title: "Motorcycle Helmet",
//     description: "High safety helmet",
//     price: 79.9,
//     category: "Automobile",
//     image: "https://i.pinimg.com/1200x/44/0c/b5/440cb51bf85d5a231584f37310048cea.jpg",
//     stock: 7
//   },
//   {
//     title: "Riding Jacket",
//     description: "Protective motorcycle jacket",
//     price: 120,
//     category: "Automobile",
//     image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7WKoE8cz7olKwKibg7KtVInwM9LAoAp6hqIxhk38nSilb2n6p0A1uiv7L46DTvKDeZjfAL2bmqTLleu09aj4zpcywU_dPeckvQt5B0BT4Yo-STrscib9uSw",
//     stock: 9
//   },
//   {
//     title: "Riding Gloves",
//     description: "Motorcycle gloves",
//     price: 59.99,
//     category: "Automobile",
//     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQKhvaqCsPP4UZVpjElsSOFbWZEqrQJ1O36kGzx0iFT9UObiGHaJ9ZHgXqf0mR1gCvJ7QRhXR6pwEnPMKYbdvX76j6MfiWS",
//     stock: 14
//   },

//   {
//     title: "Office Chair",
//     description: "Ergonomic office chair",
//     price: 149.99,
//     category: "Furniture",
//     image: "https://via.placeholder.com/300?text=Office+Chair",
//     stock: 11
//   },
//   {
//     title: "Mini Projector",
//     description: "Portable projector",
//     price: 199.99,
//     category: "Electronics",
//     image: "https://via.placeholder.com/300?text=Mini+Projector",
//     stock: 6
//   },
//   {
//     title: "External Hard Drive",
//     description: "1TB storage drive",
//     price: 59,
//     category: "Electronics",
//     image: "https://via.placeholder.com/300?text=1TB+HDD",
//     stock: 13
//   },
//   {
//     title: "Fast Charger",
//     description: "USB-C fast charger",
//     price: 24.99,
//     category: "Accessories",
//     image: "https://via.placeholder.com/300?text=Fast+Charger",
//     stock: 40
//   }
// ];
// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     await Product.deleteMany();
//     await Product.insertMany(products);

//     console.log("✅ Data Inserted Successfully");
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// seedDatabase();
import mongoose from "mongoose";
import Product from "./models/Product.js";
import Brand from "./models/Brand.js";

import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

// Every product needs a brand ref (Product.brand is required), so we seed a
// small set of brands first and then tag each product with one.
export const brands = [
  {
    name: "Aurelio Essentials",
    logo: "https://i.pinimg.com/736x/95/ec/d2/95ecd2a566e6d95988f0c826a58e2e9f.jpg",
    description: "In-house electronics & everyday accessories",
  },
  {
    name: "TrailGear",
    logo: "https://i.pinimg.com/1200x/44/0c/b5/440cb51bf85d5a231584f37310048cea.jpg",
    description: "Motorcycle and outdoor riding equipment",
  },
  {
    name: "HomeLine",
    logo: "/products/placeholder.svg",
    description: "Furniture and home essentials",
  },
  {
    name: "Aurelio Wear",
    logo: "/products/brand-aurelio-wear.svg",
    description: "Everyday clothing for men, women and kids",
  },
  { name: "Aurelio Beauty", logo: "/products/placeholder.svg", description: "Skincare, makeup and grooming" },
  { name: "Aurelio Scents", logo: "/products/placeholder.svg", description: "Perfumes, colognes and body sprays" },
  { name: "Aurelio Fit", logo: "/products/placeholder.svg", description: "Sports and fitness gear" },
  { name: "PageTurn", logo: "/products/placeholder.svg", description: "Books and stationery" },
  { name: "Playhouse", logo: "/products/placeholder.svg", description: "Toys and games for all ages" },
  {
    name: "Stride",
    logo: "/products/brand-stride.svg",
    description: "Footwear for the whole family",
  },
];

// ---------------------------------------------------------------------------
// New sections: Clothing (Men / Women / Kids), Footwear (Men / Women / Kids),
// plus more Electronics and Furniture.
//
// `category` and `subCategory` must match Frontend/src/config/categories.js.
// Images: real Unsplash photos (same CDN pattern/IDs already used in
// Frontend/src/config/categories.js for the category tiles, so these are
// known-good) - swap `image` for real per-product photography whenever you
// have it. The frontend also falls back to /products/placeholder.svg if any
// URL ever fails to load, so a bad link never shows a broken image icon.
// Prices are in INR.
// ---------------------------------------------------------------------------
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`;
const img = {
  clothingMen: unsplash("photo-1622519407650-3df9883f76a5"),
  clothingWomen: unsplash("photo-1554881070-74595ca2b74c"),
  clothingKids: unsplash("photo-1641399624718-6392f1343459"),
  footwearMen: unsplash("photo-1542272604-78d13c1f741a"),
  footwearWomen: unsplash("photo-1543163521-1bf539c55dd2"),
  footwearKids: unsplash("photo-1560243563-062bfc001d68"),
  electronics: unsplash("photo-1678851836066-dc27614cc56b"),
  furniture: unsplash("photo-1684165610413-2401399e0e59"),
  kitchen: unsplash("photo-1556911220-e15b29be8c8f"),
  kitchenware: unsplash("photo-1584990347449-a41d70a51385"),
  cookware: unsplash("photo-1590794056226-79ef3a8147e1"),
  accessories: unsplash("photo-1572196223922-d8b7e0ab0b4d"),
  wearables: unsplash("photo-1517502474097-f9b30659dadb"),
  automobile: unsplash("photo-1730577220440-d89e0726c6ee"),
  fragrances: unsplash("photo-1634944119598-837431c4900a"),
  beauty: unsplash("photo-1596462502278-27bfdc403348"),
  sports: unsplash("photo-1589579234096-25cb6b83e021"),
  books: unsplash("photo-1630852722128-db210d1b62a7"),
  toys: unsplash("photo-1516981879613-9f5da904015f"),
};

const newProducts = [
  // ---- Clothing / Men ----
  { title: "Slim Fit Denim Jeans", description: "Stretch denim, slim fit, mid rise", price: 1499, category: "Clothing", subCategory: "Men", image: img.clothingMen, stock: 30, rating: 4, brandName: "Aurelio Wear" },
  { title: "Cotton Casual Shirt", description: "Breathable pure cotton, regular fit", price: 899, category: "Clothing", subCategory: "Men", image: img.clothingMen, stock: 40, rating: 4, brandName: "Aurelio Wear" },
  { title: "Classic Polo T-Shirt", description: "Soft pique cotton polo", price: 599, category: "Clothing", subCategory: "Men", image: img.clothingMen, stock: 50, rating: 4, brandName: "Aurelio Wear" },
  { title: "Bomber Jacket", description: "Lightweight zip-up bomber jacket", price: 2999, category: "Clothing", subCategory: "Men", image: img.clothingMen, stock: 15, rating: 5, brandName: "Aurelio Wear" },
  { title: "Formal Trousers", description: "Wrinkle-resistant office trousers", price: 1299, category: "Clothing", subCategory: "Men", image: img.clothingMen, stock: 25, rating: 4, brandName: "Aurelio Wear" },

  // ---- Clothing / Women ----
  { title: "Floral Summer Dress", description: "Flowy knee-length floral dress", price: 1799, category: "Clothing", subCategory: "Women", image: img.clothingWomen, stock: 20, rating: 5, brandName: "Aurelio Wear" },
  { title: "Embroidered Cotton Kurti", description: "Hand-embroidered straight-cut kurti", price: 1199, category: "Clothing", subCategory: "Women", image: img.clothingWomen, stock: 35, rating: 4, brandName: "Aurelio Wear" },
  { title: "High-Waist Skinny Jeans", description: "Stretch denim, high-waist fit", price: 1599, category: "Clothing", subCategory: "Women", image: img.clothingWomen, stock: 28, rating: 4, brandName: "Aurelio Wear" },
  { title: "Knit Cardigan", description: "Warm open-front knit cardigan", price: 1399, category: "Clothing", subCategory: "Women", image: img.clothingWomen, stock: 18, rating: 4, brandName: "Aurelio Wear" },
  { title: "Silk Blend Saree", description: "Elegant silk blend saree with blouse piece", price: 2499, category: "Clothing", subCategory: "Women", image: img.clothingWomen, stock: 12, rating: 5, brandName: "Aurelio Wear" },

  // ---- Clothing / Kids ----
  { title: "Kids Graphic T-Shirt", description: "Soft cotton tee with fun print", price: 449, category: "Clothing", subCategory: "Kids", image: img.clothingKids, stock: 60, rating: 4, brandName: "Aurelio Wear" },
  { title: "Kids Hooded Sweatshirt", description: "Fleece-lined hoodie for cooler days", price: 799, category: "Clothing", subCategory: "Kids", image: img.clothingKids, stock: 30, rating: 4, brandName: "Aurelio Wear" },
  { title: "Girls Party Frock", description: "Layered party frock with bow detail", price: 999, category: "Clothing", subCategory: "Kids", image: img.clothingKids, stock: 22, rating: 5, brandName: "Aurelio Wear" },
  { title: "Boys Cargo Shorts", description: "Durable cotton cargo shorts", price: 599, category: "Clothing", subCategory: "Kids", image: img.clothingKids, stock: 35, rating: 4, brandName: "Aurelio Wear" },
  { title: "Kids Pyjama Set", description: "Comfy two-piece cotton night set", price: 549, category: "Clothing", subCategory: "Kids", image: img.clothingKids, stock: 40, rating: 4, brandName: "Aurelio Wear" },

  // ---- Footwear ----
  { title: "Running Shoes", description: "Cushioned mesh running shoes", price: 2499, category: "Footwear", subCategory: "Men", image: img.footwearMen, stock: 24, rating: 4, brandName: "Stride" },
  { title: "Leather Formal Shoes", description: "Classic lace-up leather oxfords", price: 2999, category: "Footwear", subCategory: "Men", image: img.footwearMen, stock: 16, rating: 4, brandName: "Stride" },
  { title: "Block Heel Sandals", description: "Comfortable block heels for all-day wear", price: 1899, category: "Footwear", subCategory: "Women", image: img.footwearWomen, stock: 20, rating: 4, brandName: "Stride" },
  { title: "Casual White Sneakers", description: "Clean everyday low-top sneakers", price: 1999, category: "Footwear", subCategory: "Women", image: img.footwearWomen, stock: 26, rating: 5, brandName: "Stride" },
  { title: "Kids Sports Shoes", description: "Lightweight, grippy school sports shoes", price: 1299, category: "Footwear", subCategory: "Kids", image: img.footwearKids, stock: 32, rating: 4, brandName: "Stride" },
  { title: "Kids Velcro Sandals", description: "Easy-fasten summer sandals", price: 699, category: "Footwear", subCategory: "Kids", image: img.footwearKids, stock: 38, rating: 4, brandName: "Stride" },

  // ---- Electronics ----
  { title: "Smartphone 128GB", description: "6.5-inch AMOLED display, 50MP camera", price: 18999, category: "Electronics", image: img.electronics, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "14-inch Laptop", description: "Thin and light, 16GB RAM, 512GB SSD", price: 42999, category: "Electronics", image: img.electronics, stock: 10, rating: 4, brandName: "Aurelio Essentials" },
  { title: "43-inch Smart TV", description: "4K UHD smart TV with built-in streaming apps", price: 26999, category: "Electronics", image: img.electronics, stock: 8, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Bluetooth Speaker", description: "Portable waterproof speaker, 12h battery", price: 2499, category: "Electronics", image: img.electronics, stock: 34, rating: 4, brandName: "Aurelio Essentials" },
  { title: "10-inch Tablet", description: "Wi-Fi tablet for reading, study and streaming", price: 14999, category: "Electronics", image: img.electronics, stock: 14, rating: 4, brandName: "Aurelio Essentials" },

  // ---- Furniture ----
  { title: "3-Seater Fabric Sofa", description: "Comfortable sofa with solid wood frame", price: 24999, category: "Furniture", image: img.furniture, stock: 6, rating: 5, brandName: "HomeLine" },
  { title: "6-Seater Dining Table", description: "Sheesham wood dining table", price: 18999, category: "Furniture", image: img.furniture, stock: 5, rating: 4, brandName: "HomeLine" },
  { title: "Queen Size Bed", description: "Engineered wood bed with headboard", price: 21999, category: "Furniture", image: img.furniture, stock: 7, rating: 4, brandName: "HomeLine" },
  { title: "5-Shelf Bookcase", description: "Open bookcase, walnut finish", price: 5999, category: "Furniture", image: img.furniture, stock: 12, rating: 4, brandName: "HomeLine" },
  { title: "Wooden Coffee Table", description: "Compact centre table with lower shelf", price: 6499, category: "Furniture", image: img.furniture, stock: 10, rating: 4, brandName: "HomeLine" },
  { title: "3-Door Wardrobe", description: "Spacious wardrobe with mirror and drawers", price: 16999, category: "Furniture", image: img.furniture, stock: 4, rating: 4, brandName: "HomeLine" },

  // ---- Kitchen & Dining (utensils) ----
  { title: "Stainless Steel Cooking Utensil Set", description: "7-piece spatula, ladle, tongs and whisk set", price: 1299, category: "Kitchen & Dining", image: img.kitchen, stock: 40, rating: 4, brandName: "HomeLine" },
  { title: "24-Piece Cutlery Set", description: "Mirror-finish stainless steel spoons, forks and knives", price: 1799, category: "Kitchen & Dining", image: img.kitchenware, stock: 30, rating: 5, brandName: "HomeLine" },
  { title: "Non-Stick Frying Pan", description: "28 cm induction-friendly non-stick pan", price: 999, category: "Kitchen & Dining", image: img.cookware, stock: 45, rating: 4, brandName: "HomeLine" },
  { title: "Wooden Spoon & Spatula Set", description: "Hand-finished teak wood serving utensils, set of 6", price: 649, category: "Kitchen & Dining", image: img.kitchen, stock: 55, rating: 4, brandName: "HomeLine" },
  { title: "Chef's Knife Set", description: "5-piece forged knife set with wooden block", price: 3499, category: "Kitchen & Dining", image: img.kitchenware, stock: 18, rating: 5, brandName: "HomeLine" },
  { title: "Pressure Cooker 5L", description: "Hard-anodised aluminium pressure cooker", price: 2199, category: "Kitchen & Dining", image: img.cookware, stock: 25, rating: 4, brandName: "HomeLine" },
  { title: "Ceramic Dinner Set", description: "18-piece plates, bowls and mugs", price: 2799, category: "Kitchen & Dining", image: img.kitchenware, stock: 15, rating: 4, brandName: "HomeLine" },
  { title: "Glass Storage Jars (Set of 6)", description: "Airtight lids, ideal for spices and grains", price: 899, category: "Kitchen & Dining", image: img.kitchen, stock: 60, rating: 4, brandName: "HomeLine" },

  // ---- Accessories ----
  { title: "Leather Bifold Wallet", description: "Genuine leather, 6 card slots", price: 699, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Aviator Sunglasses", description: "UV400 polarised metal-frame sunglasses", price: 1199, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Canvas Backpack", description: "25L laptop-friendly everyday backpack", price: 1499, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Leather Belt", description: "Reversible formal belt with steel buckle", price: 549, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Women's Tote Bag", description: "Roomy faux-leather shoulder tote", price: 1299, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Woollen Muffler", description: "Soft winter muffler", price: 399, category: "Accessories", image: img.accessories, stock: 20, rating: 4, brandName: "Aurelio Essentials" },

  // ---- Wearables ----
  { title: "Smartwatch Pro", description: "AMOLED display, GPS, 7-day battery", price: 6999, category: "Wearables", image: img.wearables, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Fitness Tracker Band", description: "Heart-rate and sleep tracking", price: 1999, category: "Wearables", image: img.wearables, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Kids Smartwatch", description: "Calling and GPS location for kids", price: 2999, category: "Wearables", image: img.wearables, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Sport Smart Ring", description: "Slim health-tracking ring", price: 8499, category: "Wearables", image: img.wearables, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Wireless Earbuds Pro", description: "ANC earbuds with charging case", price: 3499, category: "Wearables", image: img.wearables, stock: 20, rating: 4, brandName: "Aurelio Essentials" },

  // ---- Automobile ----
  { title: "Full-Face Helmet", description: "ISI-certified full-face riding helmet", price: 2499, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },
  { title: "Riding Gloves Pro", description: "Knuckle-protected touchscreen gloves", price: 899, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },
  { title: "Bike Phone Mount", description: "Vibration-proof handlebar phone holder", price: 499, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },
  { title: "Car Vacuum Cleaner", description: "Portable 12V cordless car vacuum", price: 1299, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },
  { title: "Car Seat Covers", description: "Set of 5 breathable seat covers", price: 3299, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },
  { title: "Tyre Inflator", description: "Digital portable air compressor", price: 1899, category: "Automobile", image: img.automobile, stock: 20, rating: 4, brandName: "TrailGear" },

  // ---- Fragrances ----
  { title: "Aventus Cologne", description: "Fresh woody eau de parfum, 100 ml", price: 8999, category: "Fragrances", image: img.fragrances, stock: 10, rating: 5, brandName: "Aurelio Scents" },
  { title: "El Fuego Noir", description: "Warm spicy eau de parfum, 100 ml", price: 2999, category: "Fragrances", image: img.fragrances, stock: 20, rating: 4, brandName: "Aurelio Scents" },
  { title: "Ocean Breeze Body Spray", description: "Long-lasting body spray, 150 ml", price: 349, category: "Fragrances", image: img.fragrances, stock: 20, rating: 4, brandName: "Aurelio Scents" },
  { title: "Floral Bloom Perfume", description: "Light floral fragrance for women, 50 ml", price: 1899, category: "Fragrances", image: img.fragrances, stock: 20, rating: 4, brandName: "Aurelio Scents" },
  { title: "Musk Attar Roll-On", description: "Alcohol-free attar, 10 ml", price: 449, category: "Fragrances", image: img.fragrances, stock: 20, rating: 4, brandName: "Aurelio Scents" },

  // ---- Beauty & Personal Care ----
  { title: "Matte Lipstick", description: "Long-wear matte lipstick", price: 499, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },
  { title: "Vitamin C Face Serum", description: "30 ml brightening serum", price: 799, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },
  { title: "SPF 50 Sunscreen", description: "Lightweight, non-greasy, 50 g", price: 449, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },
  { title: "Beard Grooming Kit", description: "Beard oil, balm and comb", price: 899, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },
  { title: "Makeup Brush Set", description: "12-piece professional brush set", price: 1099, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },
  { title: "Hydrating Moisturizer", description: "Daily moisturizer for all skin types", price: 549, category: "Beauty & Personal Care", image: img.beauty, stock: 20, rating: 4, brandName: "Aurelio Beauty" },

  // ---- Sports & Fitness ----
  { title: "Adjustable Dumbbell Set", description: "Pair of 20 kg adjustable dumbbells", price: 3499, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },
  { title: "Yoga Mat", description: "6 mm anti-skid yoga mat", price: 799, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },
  { title: "Resistance Bands Set", description: "5-level resistance band set", price: 599, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },
  { title: "Cricket Bat", description: "English willow bat, size 5", price: 2999, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },
  { title: "Football", description: "Size 5 match football", price: 899, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },
  { title: "Gym Duffel Bag", description: "Water-resistant gym bag with shoe pocket", price: 1199, category: "Sports & Fitness", image: img.sports, stock: 20, rating: 4, brandName: "Aurelio Fit" },

  // ---- Books & Stationery ----
  { title: "Hardbound Notebook", description: "A5 ruled 200-page notebook", price: 299, category: "Books & Stationery", image: img.books, stock: 20, rating: 4, brandName: "PageTurn" },
  { title: "Fiction Bestseller", description: "Paperback novel", price: 399, category: "Books & Stationery", image: img.books, stock: 20, rating: 4, brandName: "PageTurn" },
  { title: "Premium Pen Set", description: "Gel pen and fountain pen gift set", price: 699, category: "Books & Stationery", image: img.books, stock: 20, rating: 4, brandName: "PageTurn" },
  { title: "Daily Planner", description: "Undated 12-month planner", price: 449, category: "Books & Stationery", image: img.books, stock: 20, rating: 4, brandName: "PageTurn" },
  { title: "Kids Story Collection", description: "Illustrated set of 10 story books", price: 799, category: "Books & Stationery", image: img.books, stock: 20, rating: 4, brandName: "PageTurn" },

  // ---- Toys & Games ----
  { title: "Building Blocks Set", description: "500-piece creative blocks", price: 1299, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
  { title: "Remote Control Car", description: "Rechargeable 2.4 GHz RC car", price: 1799, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
  { title: "Board Game Classic", description: "Family strategy board game", price: 999, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
  { title: "Stuffed Teddy Bear", description: "60 cm soft plush teddy", price: 699, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
  { title: "1000-Piece Puzzle", description: "Scenic jigsaw puzzle", price: 599, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
  { title: "Action Figure Set", description: "Set of 6 poseable figures", price: 849, category: "Toys & Games", image: img.toys, stock: 20, rating: 4, brandName: "Playhouse" },
];

export const products = [
  {
    title: "Headphones Classic",
    description: "High quality headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/95/ec/d2/95ecd2a566e6d95988f0c826a58e2e9f.jpg",
    stock: 10,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones Studio",
    description: "Premium sound headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/41/94/cc/4194cc021a069c21ecbc86cc7f0ea8b2.jpg",
    stock: 12,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones Wireless",
    description: "Wireless headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/8a/48/3b/8a483b00e5d766620d85e2796f7363a4.jpg",
    stock: 15,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones Stylish",
    description: "Stylish headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/83/4e/6c/834e6c707cca182aa84c01e43bb0a031.jpg",
    stock: 8,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones Comfort",
    description: "Comfortable headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/77/1b/04/771b04b1870705bcd17ff2d498ed1ccb.jpg",
    stock: 20,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "JBL Tune 750BTNC",
    description: "Noise cancelling headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/1200x/57/71/2f/57712f7c1014b09b3a76437adb471a98.jpg",
    stock: 10,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Boat Airdopes 441",
    description: "Wireless earbuds",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/7f/86/32/7f863225b1359f7427b741e303de7a31.jpg",
    stock: 25,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "AirPods Max",
    description: "Premium Apple headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/f0/46/34/f046340c3e9fa0a558aa6efff32accb0.jpg",
    stock: 6,
    rating: 5,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Phone Holder Sakti",
    description: "Mobile stand holder",
    price: 29.9,
    category: "Accessories",
    image: "https://i.pinimg.com/736x/51/32/e3/5132e35f82fdb47c3aff447b728b3891.jpg",
    stock: 30,
    brandName: "Aurelio Essentials",
  },
  {
    title: "SONY WH-1000XM6",
    description: "Sony premium headphones",
    price: 12,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/39/48/ef/3948efa684a8b70aa45d9ab7de99f2bb.jpg",
    stock: 12,
    rating: 5,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Smart Fitness Band",
    description: "Health tracking wearable",
    price: 49,
    category: "Wearables",
    image: "https://via.placeholder.com/300?text=Fitness+Band",
    stock: 22,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Wireless Gaming Mouse",
    description: "High precision gaming mouse",
    price: 64.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=Gaming+Mouse",
    stock: 15,
    brandName: "Aurelio Essentials",
  },
  {
    title: "4K Ultra HD Monitor",
    description: "High resolution monitor",
    price: 329,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=4K+Monitor",
    stock: 5,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Smart WiFi Router",
    description: "High speed internet router",
    price: 109.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=WiFi+Router",
    stock: 10,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Motorcycle Helmet",
    description: "High safety helmet",
    price: 79.9,
    category: "Automobile",
    image: "https://i.pinimg.com/1200x/44/0c/b5/440cb51bf85d5a231584f37310048cea.jpg",
    stock: 7,
    brandName: "TrailGear",
  },
  {
    title: "Riding Jacket",
    description: "Protective motorcycle jacket",
    price: 120,
    category: "Automobile",
    image: img.automobile,
    stock: 9,
    brandName: "TrailGear",
  },
  {
    title: "Riding Gloves",
    description: "Motorcycle gloves",
    price: 59.99,
    category: "Automobile",
    image: "https://via.placeholder.com/300?text=Riding+Gloves",
    stock: 14,
    brandName: "TrailGear",
  },
  {
    title: "Office Chair",
    description: "Ergonomic office chair",
    price: 149.99,
    category: "Furniture",
    image: "https://via.placeholder.com/300?text=Office+Chair",
    stock: 11,
    brandName: "HomeLine",
  },
  {
    title: "Mini Projector",
    description: "Portable projector",
    price: 199.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=Mini+Projector",
    stock: 6,
    brandName: "Aurelio Essentials",
  },
  {
    title: "External Hard Drive",
    description: "1TB storage drive",
    price: 59,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=1TB+HDD",
    stock: 13,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Fast Charger",
    description: "USB-C fast charger",
    price: 24.99,
    category: "Accessories",
    image: "https://via.placeholder.com/300?text=Fast+Charger",
    stock: 40,
    brandName: "Aurelio Essentials",
  },
  ...newProducts,
];

// Default image per product: an illustration named after the item (served from
// Frontend/public/products/items/<slug>.svg). Products that already have their
// own photo link (e.g. the Pinterest headphones/helmet ones) keep it.
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const itemImage = (p) =>
  p.image.startsWith("https://images.unsplash.com") || p.image.includes("via.placeholder.com")
    ? "/products/placeholder.svg"
    : p.image;

// Your own downloaded photos: drop a file named after the product slug into
// Frontend/public/products/items/ (e.g. slim-fit-denim-jeans.jpg) and the seed
// uses it automatically. Priority: PIN link > local file > matched photo > illustration.
const ITEMS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../Frontend/public/products/items");
const localImage = (title) => {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    if (fs.existsSync(path.join(ITEMS_DIR, `${slugify(title)}.${ext}`))) {
      return `/products/items/${slugify(title)}.${ext}`;
    }
  }
  return null;
};

// ---------------------------------------------------------------------------
// Real product photos, matched by name.
// When you run `node products.js` (needs internet), this pulls real product
// photos from the free DummyJSON catalogue (cdn.dummyjson.com) and gives each
// of your products a photo of the SAME KIND of item - e.g. "3-Seater Fabric
// Sofa" gets a sofa photo, "Red Lipstick" a lipstick photo. Priority for each
// product is:  PIN (your own link)  >  matched real photo  >  drawn illustration.
// Products with no matching real photo keep their illustration. If the fetch
// fails (offline etc.) the seed still works and just uses the illustrations.
// ---------------------------------------------------------------------------
const RULES = [
  { re: /kids|girls|boys/, skip: true },
  { re: /shirt|polo/, cats: ["mens-shirts"] },
  { re: /dress|kurti|saree|frock/, cats: ["womens-dresses"] },
  { re: /cardigan/, cats: ["tops"] },
  { re: /heel|sandal/, cats: ["womens-shoes"] },
  { re: /shoes|sneakers/, cats: (p) => (p.subCategory === "Women" ? ["womens-shoes"] : ["mens-shoes"]) },
  { re: /smartphone/, cats: ["smartphones"] },
  { re: /laptop/, cats: ["laptops"] },
  { re: /tablet/, cats: ["tablets"] },
  { re: /sunglasses/, cats: ["sunglasses"] },
  { re: /smartwatch|fitness/, cats: ["mens-watches", "womens-watches"] },
  { re: /tote|backpack|wallet/, cats: ["womens-bags"] },
  { re: /charger/, cats: ["mobile-accessories"], words: ["charger"] },
  { re: /speaker/, cats: ["mobile-accessories"], words: ["speaker", "echo"] },
  { re: /earbuds|headphone|airpods/, cats: ["mobile-accessories"], words: ["airpods", "headphone", "earbud", "beats"] },
  { re: /lipstick/, cats: ["beauty"], words: ["lipstick"] },
  { re: /serum|moisturizer|sunscreen/, cats: ["skin-care"] },
  { re: /perfume|cologne|spray|attar|fuego/, cats: ["fragrances"] },
  { re: /sofa/, cats: ["furniture"], words: ["sofa"] },
  { re: /\bbed\b/, cats: ["furniture"], words: ["bed"] },
  { re: /chair/, cats: ["furniture"], words: ["chair"] },
  { re: /utensil set|wooden spoon/, cats: ["kitchen-accessories"], words: ["spatula", "spoon", "ladle", "tong", "whisk", "fork"] },
  { re: /knife/, cats: ["kitchen-accessories"], words: ["knife"] },
  { re: /frying pan/, cats: ["kitchen-accessories"], words: ["pan", "skillet", "wok"] },
  { re: /cooker/, cats: ["kitchen-accessories"], words: ["pot", "cooker"] },
  { re: /cutlery/, cats: ["kitchen-accessories"], words: ["fork", "spoon", "knife"] },
  { re: /dinner set/, cats: ["kitchen-accessories"], words: ["plate", "bowl", "dish"] },
  { re: /storage jars/, cats: ["kitchen-accessories"], words: ["jar", "container", "canister"] },
  { re: /cricket bat/, cats: ["sports-accessories"], words: ["cricket", "bat"] },
  { re: /football/, cats: ["sports-accessories"], words: ["football", "soccer"] },
  { re: /helmet/, cats: ["motorcycle"], words: ["helmet"] },
];

export async function fetchRealImages(list) {
  const result = {};
  try {
    if (typeof fetch !== "function") throw new Error("global fetch needs Node 18+");
    const res = await fetch("https://dummyjson.com/products?limit=0&select=title,category,thumbnail,tags");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const catalogue = (await res.json()).products || [];
    const used = {};
    list.forEach((p, i) => {
      if (p.image.includes("i.pinimg.com")) return; // already has its own photo
      const t = p.title.toLowerCase();
      for (const rule of RULES) {
        if (!rule.re.test(t)) continue;
        if (rule.skip) return;
        const cats = typeof rule.cats === "function" ? rule.cats(p) : rule.cats;
        let pool = catalogue.filter((d) => cats.includes(d.category) && d.thumbnail);
        if (rule.words) {
          pool = pool.filter((d) => rule.words.some((w) => (d.title + " " + (d.tags || []).join(" ")).toLowerCase().includes(w)));
        }
        if (!pool.length) return;
        const key = cats.join("|") + (rule.words || []).join(",");
        used[key] = (used[key] || 0) + 1;
        result[i] = pool[(used[key] - 1) % pool.length].thumbnail; // rotate for variety
        return;
      }
    });
    console.log(`Matched real photos for ${Object.keys(result).length} of ${list.length} products`);
  } catch (err) {
    console.warn("Could not fetch real photos, using illustrations instead:", err.message);
  }
  return result;
}

// ---------------------------------------------------------------------------
// PIN: paste an image address per product title.
// On Pinterest: open the pin -> right-click the image -> "Copy image address"
// (must look like https://i.pinimg.com/736x/xx/xx/xx/....jpg, NOT a pinterest.com/pin link).
// Anything left as "" keeps its default stock photo.
// ---------------------------------------------------------------------------
export const PIN = {
  "Headphones Classic": "",
  "Headphones Studio": "",
  "Headphones Wireless": "",
  "Headphones Stylish": "",
  "Headphones Comfort": "",
  "Slim Fit Denim Jeans": "",
  "Cotton Casual Shirt": "",
  "Classic Polo T-Shirt": "",
  "Bomber Jacket": "",
  "Formal Trousers": "",
  "Floral Summer Dress": "",
  "Embroidered Cotton Kurti": "",
  "High-Waist Skinny Jeans": "",
  "Knit Cardigan": "",
  "Silk Blend Saree": "",
  "Kids Graphic T-Shirt": "",
  "Kids Hooded Sweatshirt": "",
  "Girls Party Frock": "",
  "Boys Cargo Shorts": "",
  "Kids Pyjama Set": "",
  "Running Shoes": "",
  "Leather Formal Shoes": "",
  "Block Heel Sandals": "",
  "Casual White Sneakers": "",
  "Kids Sports Shoes": "",
  "Kids Velcro Sandals": "",
  "Smartphone 128GB": "",
  "14-inch Laptop": "",
  "43-inch Smart TV": "",
  "Bluetooth Speaker": "",
  "10-inch Tablet": "",
  "3-Seater Fabric Sofa": "",
  "6-Seater Dining Table": "",
  "Queen Size Bed": "",
  "5-Shelf Bookcase": "",
  "Wooden Coffee Table": "",
  "3-Door Wardrobe": "",
  "Stainless Steel Cooking Utensil Set": "",
  "24-Piece Cutlery Set": "",
  "Non-Stick Frying Pan": "",
  "Wooden Spoon & Spatula Set": "",
  "Chef's Knife Set": "",
  "Pressure Cooker 5L": "",
  "Ceramic Dinner Set": "",
  "Glass Storage Jars (Set of 6)": "",
  "Leather Bifold Wallet": "",
  "Aviator Sunglasses": "",
  "Canvas Backpack": "",
  "Leather Belt": "",
  "Women's Tote Bag": "",
  "Woollen Muffler": "",
  "Smartwatch Pro": "",
  "Fitness Tracker Band": "",
  "Kids Smartwatch": "",
  "Sport Smart Ring": "",
  "Wireless Earbuds Pro": "",
  "Full-Face Helmet": "",
  "Riding Gloves Pro": "",
  "Bike Phone Mount": "",
  "Car Vacuum Cleaner": "",
  "Car Seat Covers": "",
  "Tyre Inflator": "",
  "Aventus Cologne": "",
  "El Fuego Noir": "",
  "Ocean Breeze Body Spray": "",
  "Floral Bloom Perfume": "",
  "Musk Attar Roll-On": "",
  "Matte Lipstick": "",
  "Vitamin C Face Serum": "",
  "SPF 50 Sunscreen": "",
  "Beard Grooming Kit": "",
  "Makeup Brush Set": "",
  "Hydrating Moisturizer": "",
  "Adjustable Dumbbell Set": "",
  "Yoga Mat": "",
  "Resistance Bands Set": "",
  "Cricket Bat": "",
  "Football": "",
  "Gym Duffel Bag": "",
  "Hardbound Notebook": "",
  "Fiction Bestseller": "",
  "Premium Pen Set": "",
  "Daily Planner": "",
  "Kids Story Collection": "",
  "Building Blocks Set": "",
  "Remote Control Car": "",
  "Board Game Classic": "",
  "Stuffed Teddy Bear": "",
  "1000-Piece Puzzle": "",
  "Action Figure Set": "",
  "JBL Tune 750BTNC": "",
  "Boat Airdopes 441": "",
  "AirPods Max": "",
  "Phone Holder Sakti": "",
  "SONY WH-1000XM6": "",
  "Smart Fitness Band": "",
  "Wireless Gaming Mouse": "",
  "4K Ultra HD Monitor": "",
  "Smart WiFi Router": "",
  "Motorcycle Helmet": "",
  "Riding Jacket": "",
  "Riding Gloves": "",
  "Office Chair": "",
  "Mini Projector": "",
  "External Hard Drive": "",
  "Fast Charger": "",
};

// WARNING: this script WIPES all existing products and brands before re-inserting
// the lists above. Run it with `node products.js`.
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Brand.deleteMany();

    const createdBrands = await Brand.insertMany(brands);
    const brandIdByName = Object.fromEntries(
      createdBrands.map((b) => [b.name, b._id])
    );

    const realImages = await fetchRealImages(products);

    const productsWithBrand = products.map(({ brandName, ...p }, i) => ({
      ...p,
      image: PIN[p.title] || localImage(p.title) || realImages[i] || itemImage(p),
      brand: brandIdByName[brandName],
    }));

    await Product.insertMany(productsWithBrand);

    console.log(`Inserted ${createdBrands.length} brands and ${productsWithBrand.length} products`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Only run when this file is executed directly (`node products.js`), so importing
// `brands` / `products` from another file can never wipe the database by accident.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  seedDatabase();
}