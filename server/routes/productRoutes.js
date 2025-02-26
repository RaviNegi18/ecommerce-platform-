const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProducts,
  createProduct,
  deleteProducts,
  updateProducts,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
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

module.exports = router;
