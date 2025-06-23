const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    pricePerDay: Number,
    seats: Number,
    fuelType: String,
    imageUrl: String,
    features: [String],
    available: { type: Boolean, default: true },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt
);

module.exports = mongoose.model("Car", carSchema);
