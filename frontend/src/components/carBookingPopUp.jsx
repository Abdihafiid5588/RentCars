import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CarBookingModal({ car, onClose, onBooked }) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          car: car._id,
          pickupLocation,
          dropoffLocation,
          startDate,
          endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Booking successful!");
      onBooked();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Book {car.brand} {car.model}</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Drop-off Location"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="w-full p-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarBookingModal;
