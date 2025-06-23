const fs = require("fs");
const path = require("path");
const Car = require("../model/Car");

exports.updateCar = async (req, res) => {
  try {
    console.log("🟢 Request body:", req.body);
    console.log("🟢 File uploaded:", req.file?.filename);

    const { brand, model, pricePerDay, seats, fuelType } = req.body;

    // Format features
    let features = [];
    if (Array.isArray(req.body.features)) {
      features = req.body.features;
    } else if (typeof req.body.features === "string") {
      features = req.body.features.split(",").map(f => f.trim());
    }

    const car = await Car.findById(req.params.id);
    if (!car) {
      console.error("❌ Car not found");
      return res.status(404).json({ message: "Car not found" });
    }

    // Log current image
    console.log("🟡 Current image URL:", car.imageUrl);

    // 🧹 Delete old image if new one is uploaded
    if (req.file && car.imageUrl) {
      const oldImagePath = path.join(__dirname, "..", car.imageUrl);
      console.log("🧹 Attempting to delete:", oldImagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Will throw if fails
        console.log("✅ Old image deleted");
      } else {
        console.warn("⚠️ Old image not found:", oldImagePath);
      }
    }

    // ✅ Build update payload
    const updateFields = {
      brand,
      model,
      pricePerDay: Number(pricePerDay),
      seats: Number(seats),
      fuelType,
      features,
      updatedAt: Date.now(),
    };

    if (req.file) {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    console.log("🔄 Updating fields:", updateFields);

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    console.log("✅ Update success:", updatedCar);

    res.json({ message: "Car updated successfully", car: updatedCar });
  } catch (err) {
    console.error("❌ Update Car Error:", err);
    res.status(500).json({ error: "Failed to update car", detail: err.message });
  }
};
