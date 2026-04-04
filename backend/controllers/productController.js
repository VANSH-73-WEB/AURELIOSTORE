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

export const getsingleProduct =  async(req , res) =>{
  try{
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({ message: "Product nnot found"});
    }
    res.return(200).json(product);

  }
  catch(error){
    res.status(500).json({ message: error.message});
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
      name: { $regex: query, $options: "i" } // case-insensitive search
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};