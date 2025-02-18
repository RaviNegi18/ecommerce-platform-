const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/:id", getOrderById);

router.get("/", getAllOrders);
router.patch("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
