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

app.use(cors({
  origin: ['http://localhost:5173', 'https://aureliostore.vercel.app'],
  credentials: true
}));

// gzip every response - cuts JSON payload size (and transfer time) significantly
app.use(compression());

app.use(express.json());

app.use("/Uploads", express.static("/Uploads"));

// Cheap, no-DB route for uptime monitors (UptimeRobot / cron-job.org / etc).
// Pinging this every ~10 min keeps a free-tier Render instance from spinning
// down, which is what causes the first request after idle to take 20-40s+.
// See README "Why login/register was slow" for the full explanation.
app.get("/api/health", (req, res) => res.status(200).json({ ok: true }));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/brands", brandRoutes); // was missing entirely - /api/brands always 404'd before

// Connect to Mongo BEFORE opening the port. Previously connectDB() was fired
// and forgotten (not awaited), so on a cold start the very first request(s)
// could land before the connection was ready and sit in mongoose's query
// buffer until it finished connecting - stacking on top of Render's own
// cold-start delay. Awaiting it here means the server only starts accepting
// traffic once the DB is actually ready, which is a more honest failure mode
// and avoids that double wait.
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});