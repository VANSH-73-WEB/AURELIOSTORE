import Product from "../models/Product.js";
import mongoose from "mongoose";
//create product

export const createProduct = async(req , res) =>{
  try{
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message:"Product created",
      product
    });
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
};

//get all products

export const  getProducts = async(req , res) =>{
  try{
    const products = await Product.find();

    res.status(200).json(products);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
};

//get single products


export const getsingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
console.log("❌ ID ROUTE HIT");
    // 🔥 THIS WILL STOP THE ERROR COMPLETELY
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);

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

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: "Query is required" });
    }

    const query = q.trim();

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10) // ✅ limit results for performance
      .select("_id title description category price image"); // ✅ only needed fields

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

