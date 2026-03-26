import express from "express";
const router = express.Router();

import { addToCart, getCart, increaseQty, decreaseQty, removeFromCart } from "../controllers/cartcontroller.js";




router.post("/add", addToCart);
router.get("/:userId", getCart);
router.put("/increase", increaseQty);     
router.put("/decrease", decreaseQty);     
router.delete("/remove", removeFromCart); 

export default router;