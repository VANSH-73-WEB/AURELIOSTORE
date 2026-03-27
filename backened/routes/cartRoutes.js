import express from "express";
import {protect} from "../middleware/authmiddleware.js";
const router = express.Router();

import { addToCart, getCart, increaseQty, decreaseQty, removeFromCart } from "../controllers/cartcontroller.js";




router.post("/add",protect, addToCart);
router.get("/:userId",protect, getCart);
router.put("/increase",protect, increaseQty);     
router.put("/decrease",protect, decreaseQty);     
router.delete("/remove",protect, removeFromCart); 

export default router;