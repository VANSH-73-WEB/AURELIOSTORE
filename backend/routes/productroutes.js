import express from "express";

import {
  createProduct,
  getProducts,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  suggestProducts
} from "../controllers/productController.js";

const router = express.Router();
//routes
router.get("/suggest", suggestProducts);
router.get("/search", searchProducts);
router.get("/", getProducts);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


router.get("/:id",getsingleProduct);



export default  router;