import { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../components/sideNav";

function UserBookingSummary() {
  const [bookings, setBookings] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const calculateStats = (data) => {
    const total = data.reduce((acc, b) => acc + (b.car?.pricePerDay || 0), 0);
    setTotalSpent(total);
    setTotalCars(data.length);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-white shadow-md border-r border-gray-200">
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Booking Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Total Cars Rented</h4>
            <p className="text-2xl font-bold text-blue-600">{totalCars}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Total Amount Spent</h4>
            <p className="text-2xl font-bold text-green-600">${totalSpent}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-sm text-gray-500">Active Bookings</h4>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "approved").length}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Booking History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              {booking.car?.imageUrl && (
                <img
                  src={`http://localhost:5000${booking.car.imageUrl}`}
                  alt={booking.car.model}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {booking.car?.brand} {booking.car?.model}
                </h4>
                <p className="text-sm text-gray-600">Pickup: {booking.pickupLocation}</p>
                <p className="text-sm text-gray-600">Dropoff: {booking.dropoffLocation}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.startDate).toLocaleDateString()} → {" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p
                  className={`mt-2 text-xs font-medium px-2 py-1 rounded inline-block ${
                    booking.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserBookingSummary;
