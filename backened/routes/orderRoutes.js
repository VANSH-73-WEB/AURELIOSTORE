import express from "express";
import {protect} from "../middleware/authmiddleware.js";
const router = express.Router();

import { placeOrder, getOrders } from "../controllers/orderController.js";

router.post("/place",protect, placeOrder);
router.get("/:userId", getOrders);

export default router;