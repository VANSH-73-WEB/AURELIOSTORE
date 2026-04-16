import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/productroutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentsroutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'https://aureliostore.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.use("/Uploads", express.static("/Uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});