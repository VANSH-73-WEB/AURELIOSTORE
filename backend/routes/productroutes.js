import express from "express";

import {
  createProduct,
  getProducts,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  getProductss 
} from "../controllers/productController.js";

const router = express.Router();
//routes
router.get("/search", getProductss );
router.get("/", getProducts);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getsingleProduct);



export default  router;