import express from "express";
import productModel from "../models/productModel.js";
import { getEmbedding } from "../utills/openai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const textResults = await Product.find({ $text: { $search: query } });

    const embedding = await getEmbedding(query);

    return res.json({ textResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
});

export default router;
