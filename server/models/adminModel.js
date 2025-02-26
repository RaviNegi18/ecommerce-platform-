import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    permissions: {
      type: [String],
      default: ["manage_products", "view_orders", "manage_users"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
