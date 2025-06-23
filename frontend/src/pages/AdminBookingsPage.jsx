import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch admin bookings:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAllBookings(); // Refresh after update
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">All Bookings (Admin)</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border rounded-xl shadow hover:shadow-md p-5"
            >
              <h3 className="text-lg font-bold mb-1">
                {b.car?.brand} {b.car?.model}
              </h3>
              <p className="text-sm text-gray-600">User: {b.user?.email}</p>
              <p className="text-sm">Pickup: {b.pickupLocation}</p>
              <p className="text-sm">Dropoff: {b.dropoffLocation}</p>
              <p className="text-sm">From: {new Date(b.startDate).toLocaleDateString()}</p>
              <p className="text-sm">To: {new Date(b.endDate).toLocaleDateString()}</p>
              <p className="text-sm mt-2">
                <span
                  className={`font-semibold ${
                    b.status === "approved"
                      ? "text-green-600"
                      : b.status === "cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {b.status}
                </span>
              </p>

              {b.status === "pending" && (
                <div className="flex gap-4 mt-3">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    onClick={() => handleStatusChange(b._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleStatusChange(b._id, "cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookingsPage;
