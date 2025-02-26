import express from "express";

import {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/", placeOrder);
router.get("/:id", getOrderById);

router.get("/", getAllOrders);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
