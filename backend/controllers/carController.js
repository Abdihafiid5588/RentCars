// const fs = require("fs");
// const path = require("path");
// const Car = require("../model/Car");

// exports.addCar = async (req, res) => {
//   try {
//     const { brand, model, pricePerDay, seats, fuelType } = req.body;

//     // Handle features input
//     let features = [];
//     if (Array.isArray(req.body.features)) {
//       features = req.body.features;
//     } else if (typeof req.body.features === "string") {
//       features = [req.body.features];
//     }

//     // Handle image upload
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

//     const car = new Car({
//       brand,
//       model,
//       pricePerDay: Number(pricePerDay),
//       seats: Number(seats),
//       fuelType,
//       features,
//       imageUrl,
//     });

//     await car.save();
//     res.status(201).json({ message: "Car added", car });
//   } catch (err) {
//     console.error("Add Car Error:", err);
//     res.status(500).json({ error: "Failed to add car" });
//   }
// };

// exports.getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ available: true });
//     res.json(cars);
//   } catch (err) {
//     console.error("Get Cars Error:", err);
//     res.status(500).json({ error: "Failed to fetch cars" });
//   }
// };

// exports.updateCar = async (req, res) => {
//   try {
//     const { brand, model, pricePerDay, seats, fuelType } = req.body;
//     const carId = req.params.id;

//     // Process features input
//     let features = [];
//     if (typeof req.body.features === "string") {
//       features = req.body.features.split(",").map(f => f.trim());
//     } else if (Array.isArray(req.body.features)) {
//       features = req.body.features;
//     }

//     // Find existing car
//     const existingCar = await Car.findById(carId);
//     if (!existingCar) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     // Handle image update
//     let imageUpdate = {};
//     if (req.file) {
//       // Delete old image
//       if (existingCar.imageUrl) {
//         const oldImagePath = path.join(__dirname, "..", existingCar.imageUrl);
//         if (fs.existsSync(oldImagePath)) {
//           fs.unlinkSync(oldImagePath);
//           console.log("Old image deleted:", oldImagePath);
//         }
//       }
//       // Set new image path
//       imageUpdate.imageUrl = `/uploads/${req.file.filename}`;
//     }

//     // Update car data
//     const updatedCar = await Car.findByIdAndUpdate(
//       carId,
//       {
//         brand,
//         model,
//         pricePerDay: Number(pricePerDay),
//         seats: Number(seats),
//         fuelType,
//         features,
//         ...imageUpdate,
//       },
//       { new: true, runValidators: true }
//     );

//     res.json({
//       message: "Car updated successfully",
//       car: updatedCar,
//       newImage: !!req.file
//     });

//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({
//       error: "Failed to update car",
//       details: err.message
//     });
//   }
// };

const fs = require("fs");
const path = require("path");
const Car = require("../model/Car");

exports.addCar = async (req, res) => {
  try {
    const { brand, model, pricePerDay, seats, fuelType } = req.body;

    let features = [];
    if (Array.isArray(req.body.features)) {
      features = req.body.features;
    } else if (typeof req.body.features === "string") {
      features = [req.body.features];
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const car = new Car({
      brand,
      model,
      pricePerDay: Number(pricePerDay),
      seats: Number(seats),
      fuelType,
      features,
      imageUrl,
    });

    await car.save();
    res.status(201).json({ message: "Car added", car });
  } catch (err) {
    console.error("Add Car Error:", err);
    res.status(500).json({ error: "Failed to add car" });
  }
};

// ✅ FIXED getCars with search query support
exports.getCars = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      available: true,
      ...(search && {
        $or: [
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const cars = await Car.find(query);
    res.json(cars);
  } catch (err) {
    console.error("Get Cars Error:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { brand, model, pricePerDay, seats, fuelType } = req.body;
    const carId = req.params.id;

    let features = [];
    if (typeof req.body.features === "string") {
      features = req.body.features.split(",").map(f => f.trim());
    } else if (Array.isArray(req.body.features)) {
      features = req.body.features;
    }

    const existingCar = await Car.findById(carId);
    if (!existingCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    let imageUpdate = {};
    if (req.file) {
      if (existingCar.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", existingCar.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Old image deleted:", oldImagePath);
        }
      }
      imageUpdate.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        brand,
        model,
        pricePerDay: Number(pricePerDay),
        seats: Number(seats),
        fuelType,
        features,
        ...imageUpdate,
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Car updated successfully",
      car: updatedCar,
      newImage: !!req.file
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update car", details: err.message });
  }
};
