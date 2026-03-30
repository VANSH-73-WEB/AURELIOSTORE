import express from "express";
import {protect} from "../middleware/authmiddleware.js";
import { getMyOrders } from "../controllers/orderController.js";
const router = express.Router();

import { placeOrder, getOrders } from "../controllers/orderController.js";

router.post("/place", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:userId", protect, getOrders);
export default router;