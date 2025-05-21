// ✅ Updated backend route: adminStats.js
const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const Car = require("../model/Car");
const Booking = require("../model/Booking");
const protect = require("../middleware/authMiddleware");

router.get("/summary", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const [userCount, carCount, bookings] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Booking.find({ isPaid: true }).populate("car"), // Only PAID bookings
    ]);

    let totalRevenue = 0;
    const carRentalCount = {};

    bookings.forEach((booking) => {
      if (!booking.car || !booking.startDate || !booking.endDate) return;
      const days = Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24));
      totalRevenue += booking.car.pricePerDay * days;

      const carId = booking.car._id;
      carRentalCount[carId] = (carRentalCount[carId] || 0) + 1;
    });

    const mostRented = Object.entries(carRentalCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([carId, count]) => {
        const car = bookings.find((b) => b.car._id.toString() === carId)?.car;
        return {
          car: `${car.brand} ${car.model}`,
          rented: count,
        };
      });

    res.json({
      totalUsers: userCount,
      totalCars: carCount,
      totalBookings: bookings.length,
      totalRevenue: totalRevenue,
      topCars: mostRented.map(({ car, rented }) => {
        const [brand, ...modelParts] = car.split(" ");
        return {
          brand,
          model: modelParts.join(" "),
          rentCount: rented,
        };
      }),
    });
  } catch (err) {
    console.error("Summary fetch failed:", err);
    res.status(500).json({ error: "Summary data failed" });
  }
});

module.exports = router;
