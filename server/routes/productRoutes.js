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
const roleMiddleware = require("../middleware/roleMiddleware");

router
  .route("/")
  .get(getAllProducts)
  .post(authMiddleware, roleMiddleware("admin"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(authMiddleware, roleMiddleware("admin"), updateProducts)
  .delete(authMiddleware, roleMiddleware("admin"), deleteProducts);

module.exports = router;
