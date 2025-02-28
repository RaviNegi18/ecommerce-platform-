import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
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

export default router;
