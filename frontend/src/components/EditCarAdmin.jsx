import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    pricePerDay: "",
    seats: "",
    fuelType: "",
    features: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);

  // Fetch existing car data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars`)
      .then((res) => {
        const car = res.data.find((c) => c._id === id);
        if (car) {
          setForm({
            brand: car.brand,
            model: car.model,
            pricePerDay: car.pricePerDay,
            seats: car.seats,
            fuelType: car.fuelType,
            features: car.features.join(", "),
          });
          setImagePreview(`http://localhost:5000${car.imageUrl}`);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    for (let key in form) {
      let value = form[key];
      if (["pricePerDay", "seats"].includes(key)) {
        value = Number(value);
      }
      if (key === "features") {
        value = value.split(",").map((f) => f.trim());
        value.forEach((f) => data.append("features", f));
      } else {
        data.append(key, value);
      }
    }

    if (newImage) {
      data.append("image", newImage);
    }

    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car updated successfully!");
      navigate("/admin/manage-cars", { state: { refresh: true } });
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update car.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Car</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["brand", "model", "pricePerDay", "seats", "fuelType", "features"].map(
          (field) => (
            <input
              key={field}
              type={["pricePerDay", "seats"].includes(field) ? "number" : "text"}
              placeholder={field}
              className="w-full border p-2 rounded"
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              required
            />
          )
        )}

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Car"
            className="w-full h-48 object-cover rounded border"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}

export default EditCar;
