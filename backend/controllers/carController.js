const Car = require("../model/Car");

// Admin creates a car
exports.addCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: "Car added", car });
  } catch (err) {
    res.status(500).json({ error: "Failed to add car" });
  }
};

// Get all cars (for user booking page)
exports.getCars = async (req, res) => {
  const cars = await Car.find({ available: true });
  res.json(cars);
};
