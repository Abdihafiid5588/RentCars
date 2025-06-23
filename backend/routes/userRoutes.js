const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

const { getProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const User = require("../model/userModel");
const { updateUserProfile } = require("../controllers/userController");
const multer = require("multer");
const path = require("path");

// Promote user to admin by email (admin only)
router.put("/promote", protect, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can promote users" });
      }
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.role = "admin";
      await user.save();
  
      res.json({ message: `User ${user.email} promoted to admin` });
    } catch (err) {
      console.error("Promote User Error:", err);
      res.status(500).json({ error: "Failed to promote user" });
    }
  });

 // GET /api/users/getuser → Get all non-admin users
router.get("/", protect, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can fetch users" });
      }
  
      const users = await User.find({ role: { $ne: "admin" } }).select("-password");
      res.json(users);
    } catch (err) {
      console.error("Fetch users error:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// PUT /api/users/profile
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Fetch user profile error:", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});
  
  
  
module.exports = router;





module.exports = router;
