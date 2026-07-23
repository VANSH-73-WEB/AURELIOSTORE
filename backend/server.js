import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/productroutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentsroutes.js";
import brandRoutes from "./routes/Brandroutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'https://aureliostore.vercel.app'],
  credentials: true
}));

// gzip every response - cuts JSON payload size (and transfer time) significantly
app.use(compression());

app.use(express.json());

app.use("/Uploads", express.static("/Uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/brands", brandRoutes); // was missing entirely - /api/brands always 404'd before

app.listen(5000, () => {
  console.log("Server running on port 5000");
});