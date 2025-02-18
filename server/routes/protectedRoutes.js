const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "User Profile", user: req.user });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard Access Granted" });
});

module.exports = router;
