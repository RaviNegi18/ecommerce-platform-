import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// 📌 Place a New Order
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const placeOrder = async (req, res) => {
  try {
    const { userId, products, paymentMethod, shippingInfo } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    console.log("Received Products:", products);

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products array is required and cannot be empty" });
    }

    let totalPrice = 0;
    const orderItems = await Promise.all(
      products.map(async (item) => {
        if (!item || !isValidObjectId(item._id)) {
          throw new Error("Each product must have a valid ObjectId");
        }

        const product = await Product.findById(item._id);
        if (!product || !product.is_in_stock) {
          throw new Error(
            `Product ${product?.title || "Unknown"} is out of stock.`
          );
        }

        totalPrice += product.price * item.quantity;
        return {
          productId: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      products: orderItems,
      totalPrice,
      paymentInfo: { method: paymentMethod },
      shippingInfo,
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order Placement Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// 📌 Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId products.productId"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get All Orders (Admin Only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Delete Order (Admin)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
