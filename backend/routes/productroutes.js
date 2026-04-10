import express from "express";

import {
  createProduct,
  getProducts,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js";

const router = express.Router();
//routes

router.get("/search", searchProducts);
router.post("/create", createProduct);


router.get("/",getProducts);


router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id",getsingleProduct);
export default  router;