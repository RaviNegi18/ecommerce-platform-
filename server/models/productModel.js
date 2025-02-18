const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discounted_price: { type: Number, default: null },
    discount_expiry: { type: Date, default: null },
    currency: { type: String, default: "USD" },
    category: { type: String, required: true },
    brand: { type: String, default: "Unknown" },
    colors: { type: [String], default: ["Default Color"] },
    sizes: { type: [String], default: ["Standard"] },
    stock: { type: Number, required: true },
    sold_count: { type: Number, default: 0 },
    is_in_stock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },
    images: { type: [String], required: true },
    features: { type: [String], default: ["Standard features"] },
    shipping_info: {
      free_shipping: { type: Boolean, default: false },
      estimated_delivery: { type: String, default: "5-7 business days" },
      return_policy: { type: String, default: "No return policy" },
    },
    seller: {
      name: { type: String, default: "Default Seller" },
      rating: { type: Number, default: 0 },
      reviews_count: { type: Number, default: 0 },
    },
    tags: { type: [String], default: [] },

    // AI Search Feature: OpenAI Embeddings
    embedding: { type: [Number], default: [] },
  },
  { timestamps: true }
);

// 🔹 Full-Text Search Enable for MongoDB
productSchema.index({ title: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Product", productSchema);
