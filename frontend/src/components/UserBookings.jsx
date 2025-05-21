import Sidenav from "../components/sideNav";
import { useEffect, useState } from "react";
import axios from "axios";

function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);

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
    } catch (err) {
      console.error("Fetch bookings failed:", err);
    }
  };

  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchBookings();
    } catch (err) {
      console.error("Cancel booking failed:", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-white shadow-md border-r border-gray-200">
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 border-b pb-2">My Bookings</h2>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            You have no bookings yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                {booking.car?.imageUrl && (
                  <img
                    src={`http://localhost:5000${booking.car.imageUrl}`}
                    alt={booking.car.model}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {booking.car?.brand} {booking.car?.model}
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Pickup:</strong> {booking.pickupLocation}</li>
                    <li><strong>Dropoff:</strong> {booking.dropoffLocation}</li>
                    <li><strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}</li>
                    <li><strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}</li>
                  </ul>
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      Status: {booking.status}
                    </span>
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookingsPage;
