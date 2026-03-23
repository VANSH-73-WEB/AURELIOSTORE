import mongoose from "mongoose";
import Product from "./models/Product.js";

import dotenv from "dotenv";

dotenv.config();
export const products  = [
  {
    title: "Headphones",
    description: "High quality headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/95/ec/d2/95ecd2a566e6d95988f0c826a58e2e9f.jpg",
    stock: 10,
    rating: 4,
    reviews: 52
  },
  {
    title: "Headphones",
    description: "Premium sound headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/41/94/cc/4194cc021a069c21ecbc86cc7f0ea8b2.jpg",
    stock: 12,
    rating: 4,
    reviews: 52
  },
  {
    title: "Headphones",
    description: "Wireless headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/8a/48/3b/8a483b00e5d766620d85e2796f7363a4.jpg",
    stock: 15,
    rating: 4,
    reviews: 52
  },
  {
    title: "Headphones",
    description: "Stylish headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/83/4e/6c/834e6c707cca182aa84c01e43bb0a031.jpg",
    stock: 8,
    rating: 4,
    reviews: 52
  },
  {
    title: "Headphones",
    description: "Comfortable headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/77/1b/04/771b04b1870705bcd17ff2d498ed1ccb.jpg",
    stock: 20,
    rating: 4,
    reviews: 52
  },

  {
    title: "JBL Tune 750BTNC",
    description: "Noise cancelling headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/1200x/57/71/2f/57712f7c1014b09b3a76437adb471a98.jpg",
    stock: 10,
    rating: 4
  },
  {
    title: "Boat Airdopes 441",
    description: "Wireless earbuds",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/7f/86/32/7f863225b1359f7427b741e303de7a31.jpg",
    stock: 25,
    rating: 4
  },
  {
    title: "AirPods Max",
    description: "Premium Apple headphones",
    price: 120,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/f0/46/34/f046340c3e9fa0a558aa6efff32accb0.jpg",
    stock: 6,
    rating: 5
  },
  {
    title: "Phone Holder Sakti",
    description: "Mobile stand holder",
    price: 29.9,
    category: "Accessories",
    image: "https://i.pinimg.com/736x/51/32/e3/5132e35f82fdb47c3aff447b728b3891.jpg",
    stock: 30
  },
  {
    title: "SONY WH-1000XM6",
    description: "Sony premium headphones",
    price: 12,
    category: "Electronics",
    image: "https://i.pinimg.com/736x/39/48/ef/3948efa684a8b70aa45d9ab7de99f2bb.jpg",
    stock: 12,
    rating: 5
  },

  {
    title: "Smart Fitness Band",
    description: "Health tracking wearable",
    price: 49,
    category: "Wearables",
    image: "https://via.placeholder.com/300?text=Fitness+Band",
    stock: 22
  },
  {
    title: "Wireless Gaming Mouse",
    description: "High precision gaming mouse",
    price: 64.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=Gaming+Mouse",
    stock: 15
  },
  {
    title: "4K Ultra HD Monitor",
    description: "High resolution monitor",
    price: 329,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=4K+Monitor",
    stock: 5
  },
  {
    title: "Smart WiFi Router",
    description: "High speed internet router",
    price: 109.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=WiFi+Router",
    stock: 10
  },

  {
    title: "Motorcycle Helmet",
    description: "High safety helmet",
    price: 79.9,
    category: "Automobile",
    image: "https://i.pinimg.com/1200x/44/0c/b5/440cb51bf85d5a231584f37310048cea.jpg",
    stock: 7
  },
  {
    title: "Riding Jacket",
    description: "Protective motorcycle jacket",
    price: 120,
    category: "Automobile",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7WKoE8cz7olKwKibg7KtVInwM9LAoAp6hqIxhk38nSilb2n6p0A1uiv7L46DTvKDeZjfAL2bmqTLleu09aj4zpcywU_dPeckvQt5B0BT4Yo-STrscib9uSw",
    stock: 9
  },
  {
    title: "Riding Gloves",
    description: "Motorcycle gloves",
    price: 59.99,
    category: "Automobile",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQKhvaqCsPP4UZVpjElsSOFbWZEqrQJ1O36kGzx0iFT9UObiGHaJ9ZHgXqf0mR1gCvJ7QRhXR6pwEnPMKYbdvX76j6MfiWS",
    stock: 14
  },

  {
    title: "Office Chair",
    description: "Ergonomic office chair",
    price: 149.99,
    category: "Furniture",
    image: "https://via.placeholder.com/300?text=Office+Chair",
    stock: 11
  },
  {
    title: "Mini Projector",
    description: "Portable projector",
    price: 199.99,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=Mini+Projector",
    stock: 6
  },
  {
    title: "External Hard Drive",
    description: "1TB storage drive",
    price: 59,
    category: "Electronics",
    image: "https://via.placeholder.com/300?text=1TB+HDD",
    stock: 13
  },
  {
    title: "Fast Charger",
    description: "USB-C fast charger",
    price: 24.99,
    category: "Accessories",
    image: "https://via.placeholder.com/300?text=Fast+Charger",
    stock: 40
  }
];
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Data Inserted Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();