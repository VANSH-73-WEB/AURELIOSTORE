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
    logo: "https://images.unsplash.com/photo-1684165610413-2401399e0e59?auto=format&fit=crop&w=150&q=60",
    description: "Furniture and home essentials",
  },
  {
    name: "Aurelio Wear",
    logo: "/products/brand-aurelio-wear.svg",
    description: "Everyday clothing for men, women and kids",
  },
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
//
// Images are real, free-to-use photos hotlinked from Unsplash (same approach
// Frontend/src/config/categories.js already uses for its category tiles) -
// swap `photo()` calls for your own product photography whenever you have it.
// `img()` is kept around for any local /public/products SVGs you still want.
// Prices are in INR.
// ---------------------------------------------------------------------------
const img = (name) => `/products/${name}.svg`;
const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`;

// Same photo IDs already verified working in Frontend/src/config/categories.js,
// reused here so every product in a section gets a real photo instead of the
// old generic /products/*.svg icon.
const PHOTOS = {
  clothingMen: photo("photo-1622519407650-3df9883f76a5"),
  clothingWomen: photo("photo-1554881070-74595ca2b74c"),
  clothingKids: photo("photo-1641399624718-6392f1343459"),
  footwear: photo("photo-1542272604-78d13c1f741a"),
  electronics: photo("photo-1678851836066-dc27614cc56b"),
  furniture: photo("photo-1684165610413-2401399e0e59"),
  wearables: photo("photo-1517502474097-f9b30659dadb"),
  automobile: photo("photo-1730577220440-d89e0726c6ee"),
  accessories: photo("photo-1572196223922-d8b7e0ab0b4d"),
  // Kitchen utensils - three different real Unsplash photos so the new
  // section isn't just one image copy-pasted across every product.
  utensilsBoard: photo("photo-1685022056255-523278bf43ec"), // wooden board + spoons
  utensilsPot: photo("flagged/photo-1571902241554-82ec31087fe3"), // stainless pot with lid
  utensilsSpoons: photo("photo-1520981825232-ece5fae45120"), // wooden spoons on canister
};

const newProducts = [
  // ---- Clothing / Men ----
  { title: "Slim Fit Denim Jeans", description: "Stretch denim, slim fit, mid rise", price: 1499, category: "Clothing", subCategory: "Men", image: PHOTOS.clothingMen, stock: 30, rating: 4, brandName: "Aurelio Wear" },
  { title: "Cotton Casual Shirt", description: "Breathable pure cotton, regular fit", price: 899, category: "Clothing", subCategory: "Men", image: PHOTOS.clothingMen, stock: 40, rating: 4, brandName: "Aurelio Wear" },
  { title: "Classic Polo T-Shirt", description: "Soft pique cotton polo", price: 599, category: "Clothing", subCategory: "Men", image: PHOTOS.clothingMen, stock: 50, rating: 4, brandName: "Aurelio Wear" },
  { title: "Bomber Jacket", description: "Lightweight zip-up bomber jacket", price: 2999, category: "Clothing", subCategory: "Men", image: PHOTOS.clothingMen, stock: 15, rating: 5, brandName: "Aurelio Wear" },
  { title: "Formal Trousers", description: "Wrinkle-resistant office trousers", price: 1299, category: "Clothing", subCategory: "Men", image: PHOTOS.clothingMen, stock: 25, rating: 4, brandName: "Aurelio Wear" },

  // ---- Clothing / Women ----
  { title: "Floral Summer Dress", description: "Flowy knee-length floral dress", price: 1799, category: "Clothing", subCategory: "Women", image: PHOTOS.clothingWomen, stock: 20, rating: 5, brandName: "Aurelio Wear" },
  { title: "Embroidered Cotton Kurti", description: "Hand-embroidered straight-cut kurti", price: 1199, category: "Clothing", subCategory: "Women", image: PHOTOS.clothingWomen, stock: 35, rating: 4, brandName: "Aurelio Wear" },
  { title: "High-Waist Skinny Jeans", description: "Stretch denim, high-waist fit", price: 1599, category: "Clothing", subCategory: "Women", image: PHOTOS.clothingWomen, stock: 28, rating: 4, brandName: "Aurelio Wear" },
  { title: "Knit Cardigan", description: "Warm open-front knit cardigan", price: 1399, category: "Clothing", subCategory: "Women", image: PHOTOS.clothingWomen, stock: 18, rating: 4, brandName: "Aurelio Wear" },
  { title: "Silk Blend Saree", description: "Elegant silk blend saree with blouse piece", price: 2499, category: "Clothing", subCategory: "Women", image: PHOTOS.clothingWomen, stock: 12, rating: 5, brandName: "Aurelio Wear" },

  // ---- Clothing / Kids ----
  { title: "Kids Graphic T-Shirt", description: "Soft cotton tee with fun print", price: 449, category: "Clothing", subCategory: "Kids", image: PHOTOS.clothingKids, stock: 60, rating: 4, brandName: "Aurelio Wear" },
  { title: "Kids Hooded Sweatshirt", description: "Fleece-lined hoodie for cooler days", price: 799, category: "Clothing", subCategory: "Kids", image: PHOTOS.clothingKids, stock: 30, rating: 4, brandName: "Aurelio Wear" },
  { title: "Girls Party Frock", description: "Layered party frock with bow detail", price: 999, category: "Clothing", subCategory: "Kids", image: PHOTOS.clothingKids, stock: 22, rating: 5, brandName: "Aurelio Wear" },
  { title: "Boys Cargo Shorts", description: "Durable cotton cargo shorts", price: 599, category: "Clothing", subCategory: "Kids", image: PHOTOS.clothingKids, stock: 35, rating: 4, brandName: "Aurelio Wear" },
  { title: "Kids Pyjama Set", description: "Comfy two-piece cotton night set", price: 549, category: "Clothing", subCategory: "Kids", image: PHOTOS.clothingKids, stock: 40, rating: 4, brandName: "Aurelio Wear" },

  // ---- Footwear ----
  { title: "Running Shoes", description: "Cushioned mesh running shoes", price: 2499, category: "Footwear", subCategory: "Men", image: PHOTOS.footwear, stock: 24, rating: 4, brandName: "Stride" },
  { title: "Leather Formal Shoes", description: "Classic lace-up leather oxfords", price: 2999, category: "Footwear", subCategory: "Men", image: PHOTOS.footwear, stock: 16, rating: 4, brandName: "Stride" },
  { title: "Block Heel Sandals", description: "Comfortable block heels for all-day wear", price: 1899, category: "Footwear", subCategory: "Women", image: PHOTOS.footwear, stock: 20, rating: 4, brandName: "Stride" },
  { title: "Casual White Sneakers", description: "Clean everyday low-top sneakers", price: 1999, category: "Footwear", subCategory: "Women", image: PHOTOS.footwear, stock: 26, rating: 5, brandName: "Stride" },
  { title: "Kids Sports Shoes", description: "Lightweight, grippy school sports shoes", price: 1299, category: "Footwear", subCategory: "Kids", image: PHOTOS.footwear, stock: 32, rating: 4, brandName: "Stride" },
  { title: "Kids Velcro Sandals", description: "Easy-fasten summer sandals", price: 699, category: "Footwear", subCategory: "Kids", image: PHOTOS.footwear, stock: 38, rating: 4, brandName: "Stride" },

  // ---- Electronics ----
  { title: "Smartphone 128GB", description: "6.5-inch AMOLED display, 50MP camera", price: 18999, category: "Electronics", image: PHOTOS.electronics, stock: 20, rating: 4, brandName: "Aurelio Essentials" },
  { title: "14-inch Laptop", description: "Thin and light, 16GB RAM, 512GB SSD", price: 42999, category: "Electronics", image: PHOTOS.electronics, stock: 10, rating: 4, brandName: "Aurelio Essentials" },
  { title: "43-inch Smart TV", description: "4K UHD smart TV with built-in streaming apps", price: 26999, category: "Electronics", image: PHOTOS.electronics, stock: 8, rating: 4, brandName: "Aurelio Essentials" },
  { title: "Bluetooth Speaker", description: "Portable waterproof speaker, 12h battery", price: 2499, category: "Electronics", image: PHOTOS.electronics, stock: 34, rating: 4, brandName: "Aurelio Essentials" },
  { title: "10-inch Tablet", description: "Wi-Fi tablet for reading, study and streaming", price: 14999, category: "Electronics", image: PHOTOS.electronics, stock: 14, rating: 4, brandName: "Aurelio Essentials" },

  // ---- Furniture ----
  { title: "3-Seater Fabric Sofa", description: "Comfortable sofa with solid wood frame", price: 24999, category: "Furniture", image: PHOTOS.furniture, stock: 6, rating: 5, brandName: "HomeLine" },
  { title: "6-Seater Dining Table", description: "Sheesham wood dining table", price: 18999, category: "Furniture", image: PHOTOS.furniture, stock: 5, rating: 4, brandName: "HomeLine" },
  { title: "Queen Size Bed", description: "Engineered wood bed with headboard", price: 21999, category: "Furniture", image: PHOTOS.furniture, stock: 7, rating: 4, brandName: "HomeLine" },
  { title: "5-Shelf Bookcase", description: "Open bookcase, walnut finish", price: 5999, category: "Furniture", image: PHOTOS.furniture, stock: 12, rating: 4, brandName: "HomeLine" },
  { title: "Wooden Coffee Table", description: "Compact centre table with lower shelf", price: 6499, category: "Furniture", image: PHOTOS.furniture, stock: 10, rating: 4, brandName: "HomeLine" },
  { title: "3-Door Wardrobe", description: "Spacious wardrobe with mirror and drawers", price: 16999, category: "Furniture", image: PHOTOS.furniture, stock: 4, rating: 4, brandName: "HomeLine" },

  // ---- Home & Kitchen / Utensils (new section) ----
  { title: "Stainless Steel Cookware Set (5 pcs)", description: "3 pots + 2 frying pans, induction friendly", price: 3499, category: "Home & Kitchen", image: PHOTOS.utensilsPot, stock: 14, rating: 5, brandName: "HomeLine" },
  { title: "Non-Stick Frying Pan 28cm", description: "Scratch-resistant coating, cool-touch handle", price: 899, category: "Home & Kitchen", image: PHOTOS.utensilsPot, stock: 26, rating: 4, brandName: "HomeLine" },
  { title: "Insulated Steel Kettle 1.5L", description: "Double-wall stainless kettle, keeps water hot for hours", price: 899, category: "Home & Kitchen", image: PHOTOS.utensilsPot, stock: 20, rating: 4, brandName: "HomeLine" },
  { title: "Wooden Spoon & Spatula Set (6 pcs)", description: "Natural acacia wood, gentle on non-stick cookware", price: 499, category: "Home & Kitchen", image: PHOTOS.utensilsBoard, stock: 40, rating: 4, brandName: "HomeLine" },
  { title: "Marble-Finish Chopping Board", description: "Heavy-duty wooden cutting board with juice groove", price: 649, category: "Home & Kitchen", image: PHOTOS.utensilsBoard, stock: 30, rating: 4, brandName: "HomeLine" },
  { title: "Bamboo Utensil Holder", description: "Countertop caddy for spoons, spatulas and whisks", price: 399, category: "Home & Kitchen", image: PHOTOS.utensilsBoard, stock: 35, rating: 4, brandName: "HomeLine" },
  { title: "Stainless Steel Utensil Set (7 pcs)", description: "Ladle, slotted spoon, tongs, whisk and more", price: 799, category: "Home & Kitchen", image: PHOTOS.utensilsSpoons, stock: 24, rating: 5, brandName: "HomeLine" },
  { title: "Stainless Steel Mixing Bowls (3 pcs)", description: "Nesting bowls, 1L / 2L / 3L", price: 599, category: "Home & Kitchen", image: PHOTOS.utensilsSpoons, stock: 28, rating: 4, brandName: "HomeLine" },
  { title: "Silicone Tongs & Turner Set", description: "Heat-resistant to 220°C, non-scratch on any pan", price: 349, category: "Home & Kitchen", image: PHOTOS.utensilsSpoons, stock: 45, rating: 4, brandName: "HomeLine" },
];

export const products = [
  {
    title: "Headphones",
    description: "High quality headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/95/ec/d2/95ecd2a566e6d95988f0c826a58e2e9f.jpg",
    stock: 10,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones",
    description: "Premium sound headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/41/94/cc/4194cc021a069c21ecbc86cc7f0ea8b2.jpg",
    stock: 12,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones",
    description: "Wireless headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/8a/48/3b/8a483b00e5d766620d85e2796f7363a4.jpg",
    stock: 15,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones",
    description: "Stylish headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/83/4e/6c/834e6c707cca182aa84c01e43bb0a031.jpg",
    stock: 8,
    rating: 4,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Headphones",
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
    image: "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?auto=format&fit=crop&w=800&q=60",
    stock: 22,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Wireless Gaming Mouse",
    description: "High precision gaming mouse",
    price: 64.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?auto=format&fit=crop&w=800&q=60",
    stock: 15,
    brandName: "Aurelio Essentials",
  },
  {
    title: "4K Ultra HD Monitor",
    description: "High resolution monitor",
    price: 329,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?auto=format&fit=crop&w=800&q=60",
    stock: 5,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Smart WiFi Router",
    description: "High speed internet router",
    price: 109.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?auto=format&fit=crop&w=800&q=60",
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
    image: "https://i.pinimg.com/736x/44/0c/b5/440cb51bf85d5a231584f37310048cea.jpg",
    stock: 9,
    brandName: "TrailGear",
  },
  {
    title: "Riding Gloves",
    description: "Motorcycle gloves",
    price: 59.99,
    category: "Automobile",
    image: "https://images.unsplash.com/photo-1730577220440-d89e0726c6ee?auto=format&fit=crop&w=800&q=60",
    stock: 14,
    brandName: "TrailGear",
  },
  {
    title: "Office Chair",
    description: "Ergonomic office chair",
    price: 149.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1684165610413-2401399e0e59?auto=format&fit=crop&w=800&q=60",
    stock: 11,
    brandName: "HomeLine",
  },
  {
    title: "Mini Projector",
    description: "Portable projector",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?auto=format&fit=crop&w=800&q=60",
    stock: 6,
    brandName: "Aurelio Essentials",
  },
  {
    title: "External Hard Drive",
    description: "1TB storage drive",
    price: 59,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?auto=format&fit=crop&w=800&q=60",
    stock: 13,
    brandName: "Aurelio Essentials",
  },
  {
    title: "Fast Charger",
    description: "USB-C fast charger",
    price: 24.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572196223922-d8b7e0ab0b4d?auto=format&fit=crop&w=800&q=60",
    stock: 40,
    brandName: "Aurelio Essentials",
  },
  ...newProducts,
];

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

    const productsWithBrand = products.map(({ brandName, ...p }) => ({
      ...p,
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
