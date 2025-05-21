const express = require("express");
const router = express.Router();
const Payment = require("../model/Payment");
const protect = require("../middleware/authMiddleware");

// Get all pending payments (admin only)
router.get("/admin/pending", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const pending = await Payment.find({ status: "pending" }).populate("user booking");
  res.json(pending);
});

// Approve or reject a payment
router.put("/admin/approve/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const { status } = req.body; // status should be "approved" or "rejected"

  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: "Payment not found" });

  payment.status = status;
  await payment.save();

  res.json({ message: `Payment ${status}` });
});

module.exports = router;
