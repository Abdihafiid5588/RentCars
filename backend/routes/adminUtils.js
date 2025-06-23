
const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const protect = require("../middleware/authMiddleware");

// Promote user to admin by ID (admin-only)
router.put("/promote", protect, async (req, res) => {
  try {
    // Optional: only allow superadmins to do this
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can promote users" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: `User ${user.email} promoted to admin` });
  } catch (err) {
    console.error("Promotion error:", err);
    res.status(500).json({ error: "Failed to promote user" });
  }
});

module.exports = router;
