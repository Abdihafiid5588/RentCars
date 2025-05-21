const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Booking = require("../model/Booking");
const Payment = require("../model/Payment");

// POST /api/payments/demo
router.post("/demo", protect, async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    const booking = await Booking.findById(bookingId).populate("car");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const days = Math.ceil(
      (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)
    );

    const expectedAmount = booking.car.pricePerDay * days;

    if (Number(amount) !== expectedAmount) {
      return res.status(400).json({ message: "Amount does not match booking total" });
    }

    const payment = new Payment({
      user: req.user.id,
      booking: bookingId,
      amount: expectedAmount,
      method: "Demo",
      status: "approved",
    });

    await payment.save();
    res.status(201).json({ message: "Demo payment successful" });
  } catch (err) {
    console.error("Demo payment error:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
