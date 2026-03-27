import express from "express";
import {protect} from "../middleware/authmiddleware.js";
const router = express.Router();

import { addToCart, getCart, increaseQty, decreaseQty, removeFromCart } from "../controllers/cartcontroller.js";




router.post("/add",protect, addToCart);
router.put("/increase",protect, increaseQty);     
router.put("/decrease",protect, decreaseQty);     
router.delete("/remove",protect, removeFromCart); 
router.get("/mycart",protect, getCart);

export default router;