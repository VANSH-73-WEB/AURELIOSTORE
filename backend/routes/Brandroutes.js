import express from "express";
import Brand from "../models/Brand.js";

const router = express.Router();

// Get all brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find().lean();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single brand
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).lean();
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
