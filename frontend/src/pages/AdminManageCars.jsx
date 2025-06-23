import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

function AdminManageCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCars();
    if (location.state?.refresh) {
      window.history.replaceState({}, ""); // Clean state after refresh
    }
  }, [location.state?.refresh]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete car.");
    }
  };

  const handleEdit = (car) => {
    navigate(`/admin/edit-car/${car._id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Manage Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            {car.imageUrl ? (
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                    src={`http://localhost:5000${car.imageUrl}?t=${new Date().getTime()}`}
                  alt={car.model}
                  className="w-full h-full object-cover object-center transition duration-300"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm text-gray-500">
                  💵 ${car.pricePerDay} / day
                </p>
                <p className="text-sm text-gray-500">
                  🛢 {car.fuelType} | 👥 {car.seats} seats
                </p>
                <p className="text-sm text-gray-500">
                  🛠 Features: {car.features.join(", ")}
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(car)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          
        ))}
      </div>
      <br />
      <Link to="/admin" className="bg-blue-400 py-4 px-2 mt-10 rounded-full text-white" ><button>go back</button></Link>


      {cars.length === 0 && (
        <p className="text-gray-500 text-center mt-10">No cars added yet.</p>
      )}
    </div>
  );
}

export default AdminManageCars;
