import express from "express";

import {
  createProduct,
  getProducts,
  getsingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();
//routes

router.post("/create", createProduct);
router.get("/",getProducts);
router.get("/:id",getsingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default  router;