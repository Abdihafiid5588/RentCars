// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking");
const protect = require("../middleware/authMiddleware");

// Create booking
router.post("/", protect, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});

// User's own bookings
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("car");
  res.json(bookings);
});

// Admin: all bookings
router.get("/", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
  const bookings = await Booking.find().populate("car user");
  res.json(bookings);
});

// Cancel a booking
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

router.put("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking ${status}` });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ error: "Status update failed" });
  }
});

// GET /api/bookings/my-latest
router.get("/my-latest", protect, async (req, res) => {
  const latest = await Booking.findOne({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate("car");

  if (!latest) return res.status(404).json({ message: "No bookings found" });

  const days = Math.ceil(
    (new Date(latest.endDate) - new Date(latest.startDate)) / (1000 * 60 * 60 * 24)
  );

  const amount = latest.car.pricePerDay * days;

  res.json({ bookingId: latest._id, amount });
});
// GET /api/bookings/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking' });
  }
});


module.exports = router;
