const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// 📌 Place a New Order
const placeOrder = async (req, res) => {
  try {
    const { userId, products, paymentMethod, shippingInfo } = req.body;

    // Validate products
    let totalPrice = 0;
    const orderItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product || product.stock < item.quantity) {
          throw new Error(
            `Product ${product?.title || "Unknown"} is out of stock`
          );
        }
        totalPrice += product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    // Create order
    const order = new Order({
      userId,
      products: orderItems,
      totalPrice,
      paymentInfo: { method: paymentMethod },
      shippingInfo,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
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

module.exports = {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
