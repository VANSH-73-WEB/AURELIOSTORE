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

//search products

export const searchProducts = async (req, res) => {
  try {
    console.log("🔥 API HIT");

    const q = req.query.q || "";

    const products = await Product.find();

    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );

    res.json(filtered);

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};