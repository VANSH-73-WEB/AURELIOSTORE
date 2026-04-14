import Product from "../models/Product.js";
import mongoose from "mongoose";
//create product

export const createProduct = async (req, res) => {
  try {
    const { brand } = req.body;

    // 🔹 Check if brand exists
    const brandExists = await Brand.findById(brand);
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
export const getProducts = async (req, res) => {
  try {
    const { brand } = req.query;

    let filter = {};

    // 🔹 Filter by brand
    if (brand) {
      filter.brand = brand;
    }

    const products = await Product.find(filter)
      .populate("brand", "name logo"); // 👈 IMPORTANT

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const { q, brand } = req.query;

    let filter = {
      title: { $regex: q, $options: "i" }
    };

    if (brand) {
      filter.brand = brand;
    }

    const products = await Product.find(filter)
      .populate("brand", "name logo");

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};