const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("cononoc", process.env.MONGO_URI);
  try {
    await mongoose.connect("mongodb://localhost:27017/E-COMMERCE", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
