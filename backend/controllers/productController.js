import Product from "../models/Product.js";
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
import mongoose from "mongoose";

export const getsingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

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
    const query = req.query.q;

      const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};