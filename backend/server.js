const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const protect = require("./middleware/authMiddleware");
const bookingRoutes = require("./routes/bookingRoutes");
const adminUtilsRoutes = require("./routes/adminUtils");
const adminRoutes = require("./routes/adminRoutes");
const adminStats = require("./routes/adminStats");
// const paymentRoutes = require("./routes/paymentApprove");
// const paymentR = require("./routes/paymentRoutes");
const demoPaymentRoute = require("./routes/paymentRoutes");




const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();


// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/rentcars", {

});
mongoose.set("strictQuery", true);

// API Routes
app.use("/api/users", userRoutes);


app.use("/api/cars", carRoutes);

app.use('/uploads', express.static('uploads'));

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminUtilsRoutes);


app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminStats);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/payments", paymentR);

app.use("/api/payments", demoPaymentRoute);

// Boking API

app.get('/api/bookings', protect, async (req, res) => {
  const userId = req.user.id;
  try {
    const reservation = await Reservation.find({ owner: userId });
    if (reservation) {
      res.json(reservation);
    } else {
      res.json(null);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});



// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
