import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import mongoose from "mongoose";

// Escape user input before putting it inside a RegExp
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
// Supports ?brand=<id>&category=<name>&subCategory=<name>&page=1&limit=24
// - lean() skips building full Mongoose documents (big win on large lists)
// - pagination stops us shipping/scanning the entire collection on every load
export const getProducts = async (req, res) => {
  try {
    const { brand, category, subCategory, page = 1, limit = 24 } = req.query;

    let filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(parseInt(limit) || 24, 100); // hard cap to avoid abuse
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("brand", "name logo")
        .select("title price image brand category subCategory stock rating createdAt")
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
// Optional narrowing: ?brand=<id>&category=<name>&subCategory=<name>
//
// Two passes so results stay relevant:
//   1) "starts with" on title, category or sub-category - so typing "men" finds
//      Men's clothing (subCategory "Men") but NOT "Women", and typing
//      "furniture" returns the Furniture section.
//   2) only if pass 1 found nothing: title "contains" as a fallback
//      (e.g. "jeans" -> "Slim Fit Jeans").
export const searchProducts = async (req, res) => {
  try {
    const { q, brand, category, subCategory } = req.query;
    if (!q || !q.trim()) return res.json([]);

    const safeQ = escapeRegex(q.trim());

    const scope = {};
    if (brand) scope.brand = brand;
    if (category) scope.category = category;
    if (subCategory) scope.subCategory = subCategory;

    const run = (match) =>
      Product.find({ ...scope, ...match })
        .populate("brand", "name logo")
        .select("title price image brand category subCategory")
        .limit(30)
        .lean();

    const startsWith = { $regex: "^" + safeQ, $options: "i" };
    let products = await run({
      $or: [{ title: startsWith }, { category: startsWith }, { subCategory: startsWith }],
    });

    if (products.length === 0) {
      products = await run({ title: { $regex: safeQ, $options: "i" } });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// lightweight autocomplete endpoint - no populate, tiny payload, capped results.
// The search-as-you-type dropdown calls this instead of the heavier /search route.
// Titles that start with the query come first, then titles that merely contain it.
// Duplicate titles are collapsed so the dropdown never shows the same line twice.
export const suggestProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.json([]);

    const safeQ = escapeRegex(q.trim());

    const starts = await Product.find(
      { title: { $regex: "^" + safeQ, $options: "i" } },
      { title: 1 }
    )
      .limit(30)
      .lean();

    let rows = starts;
    if (starts.length < 6) {
      const contains = await Product.find(
        {
          title: { $regex: safeQ, $options: "i" },
          _id: { $nin: starts.map((r) => r._id) },
        },
        { title: 1 }
      )
        .limit(30)
        .lean();
      rows = starts.concat(contains);
    }

    const seen = new Set();
    const suggestions = [];
    for (const row of rows) {
      const key = row.title.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push(row);
      if (suggestions.length === 6) break;
    }

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
