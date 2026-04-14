import express from "express";
import Brand from "../models/brandModel.js";

const router = express.Router();

// Get all brands
router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

// Get single brand
router.get("/:id", async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json(brand);
});

export default router;