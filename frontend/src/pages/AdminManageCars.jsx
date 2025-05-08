import { useEffect, useState } from "react";
import axios from "axios";

function AdminManageCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars")
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this car?")) {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(prev => prev.filter(car => car._id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Manage Cars</h2>
      <div className="space-y-4">
        {cars.map(car => (
          <div key={car._id} className="flex justify-between items-center border-b py-3">
            <div>
              <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
              <p className="text-gray-500">{car.pricePerDay} / day</p>
            </div>
            <button onClick={() => handleDelete(car._id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManageCars;
