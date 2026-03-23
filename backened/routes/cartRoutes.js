import express from "express";
const router = express.Router();

import { addToCart, getCart } from "../controllers/cartcontroller.js";

router.post("/add", addToCart);
router.get("/:userId", getCart);

export default router;