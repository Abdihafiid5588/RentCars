import { useState } from "react";
import axios from "axios";

function AdminAddCar() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    pricePerDay: "",
    seats: "",
    fuelType: "",
    features: "", // Comma-separated string input
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();

    // Convert and append fields
    for (let key in form) {
      const value =
        ["pricePerDay", "seats"].includes(key)
          ? Number(form[key])
          : key === "features"
          ? form[key].split(",").map(f => f.trim())
          : form[key];

      if (key === "features" && Array.isArray(value)) {
        value.forEach((feature) => {
          data.append("features", feature);
        });
      } else {
        data.append(key, value);
      }
    }

    // Append image file
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/cars", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car added!");
      setForm({
        brand: "",
        model: "",
        pricePerDay: "",
        seats: "",
        fuelType: "",
        features: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error("Add Car Error:", err);
      alert("Failed to add car");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text inputs */}
        {["brand", "model", "pricePerDay", "seats", "fuelType", "features"].map((field) => (
          <input
            key={field}
            type={["pricePerDay", "seats"].includes(field) ? "number" : "text"}
            placeholder={field}
            className="w-full border p-2 rounded"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AdminAddCar;
