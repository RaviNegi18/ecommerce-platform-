import express from "express";
const router = express.Router();

import {
  getProductById,
  getAllProducts,
  createProduct,
  deleteProducts,
  updateProducts,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

router
  .route("/")
  .get(getAllProducts)
  .post(authMiddleware, roleMiddleware("admin"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(authMiddleware, roleMiddleware("admin"), updateProducts)
  .delete(authMiddleware, roleMiddleware("admin"), deleteProducts);

export default router;
