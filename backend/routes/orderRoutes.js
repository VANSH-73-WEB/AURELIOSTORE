import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { getMyOrders } from "../controllers/orderController.js";
import { getOrders } from "../controllers/orderController.js";
const router = express.Router();


router.get("/myorders", protect, getMyOrders);
router.get("/:userId", protect, getOrders);
export default router;