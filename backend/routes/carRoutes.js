// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { addCar, getCars, updateCar } = require("../controllers/carController");
// const protect = require("../middleware/authMiddleware");
// const Car = require("../model/Car");

// // ✅ Admin-only middleware
// const adminOnly = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Admins only" });
//   }
//   next();
// };

// // ✅ Multer config: store images in /uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // this folder must exist
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
    
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// // ✅ ROUTES

// // Get all available cars (public)
// router.get("/", getCars);

// // Add a new car with image (admin only)
// router.post("/", protect, adminOnly, upload.single("image"), addCar);

// // Update a car (admin only)

// router.put("/:id", protect, adminOnly, upload.single("image"), updateCar);


// // Delete a car (admin only)
// router.delete("/:id", protect, adminOnly, async (req, res) => {
//   try {
//     await Car.findByIdAndDelete(req.params.id);
//     res.json({ message: "Car deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete car" });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const { search } = req.query;
//     const query = search
//       ? {
//           $or: [
//             { brand: { $regex: search, $options: "i" } },
//             { model: { $regex: search, $options: "i" } },
//           ],
//         }
//       : {};

//     const cars = await Car.find(query);
//     res.json(cars);
//   } catch (err) {
//     console.error("Car fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch cars" });
//   }
// });
// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCar, getCars, updateCar } = require("../controllers/carController");
const protect = require("../middleware/authMiddleware");
const Car = require("../model/Car");

const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ ONLY THIS ONE - do NOT duplicate
router.get("/", getCars);

router.post("/", protect, adminOnly, upload.single("image"), addCar);
router.put("/:id", protect, adminOnly, upload.single("image"), updateCar);
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete car" });
  }
});

module.exports = router;
