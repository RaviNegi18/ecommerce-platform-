const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin Auth Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/customer", authMiddleware, roleMiddleware("admin"), getAllUsers);

router.get(
  "/customer/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getUserById
);

router.patch(
  "/customer/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserById
);

router.delete(
  "/customer/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUserById
);

// Admin Routes (Protected: Only accessible by superadmin)
router.get(
  "/super",
  authMiddleware,
  roleMiddleware("superadmin"),
  getAllAdmins
);

router.get(
  "/super/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  getAdminById
);

module.exports = router;
