const express = require("express");
const router = express.Router();
const { addCar, getCars } = require("../controllers/carController");
const protect = require("../middleware/authMiddleware");

// ✅ Only admin can add a car
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};
router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
      await Car.findByIdAndDelete(req.params.id);
      res.json({ message: "Car deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete car" });
    }
  });

router.post("/", protect, adminOnly, addCar); // POST /api/cars
router.get("/", getCars); // GET /api/cars → for user booking page

module.exports = router;
