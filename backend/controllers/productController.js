import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import mongoose from "mongoose";

//create product
export const createProduct = async (req, res) => {
  try {
    const { brand } = req.body;

    // Check if brand exists
    const brandExists = await Brand.findById(brand).lean();
    if (!brandExists) {
      return res.status(400).json({ message: "Invalid brand ID" });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get all products
// Supports ?brand=<id>&category=<name>&page=1&limit=24
// - lean() skips building full Mongoose documents (big win on large lists)
// - pagination stops us shipping/scanning the entire collection on every load
export const getProducts = async (req, res) => {
  try {
    const { brand, category, page = 1, limit = 24 } = req.query;

    let filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(parseInt(limit) || 24, 100); // hard cap to avoid abuse
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("brand", "name logo")
        .select("title price image brand category stock rating createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get single product
export const getsingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id)
      .populate("brand", "name logo")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update product
export const updateProduct = async (req , res) =>{
  try{
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    res.status(200).json(product);
  }
  catch(error){
   res.status(500).json({ message: error.message});
  }
};

//delete product
export const deleteProduct = async (req , res) =>{
  try{
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted"
    });
  }
    catch(error){
      res.status(500).json({ message: error.message})
    };

};

// full search (used when the user hits Enter / clicks Search)
// Anchored regex ("^") can use the title index; unanchored "contains" search
// only runs as a fallback when the anchored search returns nothing.
export const searchProducts = async (req, res) => {
  try {
    const { q, brand } = req.query;
    if (!q || !q.trim()) return res.json([]);

    const safeQ = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let filter = { title: { $regex: "^" + safeQ, $options: "i" } };
    if (brand) filter.brand = brand;

    let products = await Product.find(filter)
      .populate("brand", "name logo")
      .select("title price image brand category")
      .limit(30)
      .lean();

    if (products.length === 0) {
      filter.title = { $regex: safeQ, $options: "i" };
      products = await Product.find(filter)
        .populate("brand", "name logo")
        .select("title price image brand category")
        .limit(30)
        .lean();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// lightweight autocomplete endpoint - no populate, tiny payload, capped results.
// The search-as-you-type dropdown calls this instead of the heavier /search route.
export const suggestProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.json([]);

    const safeQ = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const suggestions = await Product.find(
      { title: { $regex: "^" + safeQ, $options: "i" } },
      { title: 1 }
    )
      .limit(6)
      .lean();

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
