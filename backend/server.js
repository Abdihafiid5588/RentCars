const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();


// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/rentcars", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Routes
app.use("/api/users", userRoutes);

app.use("/api/cars", carRoutes);

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
