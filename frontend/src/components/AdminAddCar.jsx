import { useState } from "react";
import axios from "axios";

function AdminAddCar() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    pricePerDay: "",
    seats: "",
    fuelType: "",
    imageUrl: "",
    features: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/cars", {
        ...form,
        features: form.features.split(","),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Car added!");
      setForm({ brand: "", model: "", pricePerDay: "", seats: "", fuelType: "", imageUrl: "", features: "" });
    } catch (err) {
        console.error("Add Car Error:", err);
      alert("Failed to add car");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["brand", "model", "pricePerDay", "seats", "fuelType", "imageUrl", "features"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full border p-2 rounded"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button className="bg-blue-600 text-white w-full py-2 rounded">Add Car</button>
      </form>
    </div>
  );
}

export default AdminAddCar;
