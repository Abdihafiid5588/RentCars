const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const protect = require("../middleware/authMiddleware");

router.post("/promote", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin" });
  } catch (err) {
    console.error("Promote error:", err);
    res.status(500).json({ error: "Promotion failed" });
  }
});

module.exports = router;
