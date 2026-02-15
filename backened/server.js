import express from "express";
import dotenv from "dotenv";

dotenv.config(); // ✅ correct
console.log("JWT:", process.env.JWT_SECRET);

const app = express();
