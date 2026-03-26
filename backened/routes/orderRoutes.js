import express from "express";
const router = express.Router();

import { placeOrder, getOrders } from "../controllers/orderController.js";

router.post("/place", placeOrder);
router.get("/:userId", getOrders);

export default router;