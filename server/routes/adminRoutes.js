const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

// 👤 Get All Admins (Only for Super Admin)
router.get(
  "/super",
  authMiddleware,
  roleMiddleware("superadmin"),
  getAllAdmins
);

// 👤 Get Admin Details
router.get(
  "/super/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  getAdminById
);

module.exports = router;
