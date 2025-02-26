import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/api/test", (req, res) => {
  res.json({ message: "Test endpoint works!" });
});

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://shopsy-pink.vercel.app",
  "https://latest-2anf.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
