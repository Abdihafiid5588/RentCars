// pages/paypage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ManualPaymentPage({ bookingId }) {
  const [booking, setBooking] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const adminPhone = "*712*613830203*"; // Replace with your number

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
        setError(true);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/payments/manual",
        {
          bookingId,
          amount: booking?.totalPrice || 0,
          phone: adminPhone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitted(true);
    } catch (err) {
      console.error("Payment confirm error:", err);
      alert("Failed to confirm payment.");
    }
  };

  if (error) return <p className="text-red-600">Booking not found.</p>;
  if (!booking) return <p>Loading booking info...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Complete Your Payment</h2>
      <p className="text-gray-700 mb-2">Amount to Pay: <strong>${booking.totalPrice}</strong></p>
      <p className="text-gray-700 mb-4">Send payment to: <strong>{adminPhone}</strong></p>

      <a href={`tel:${adminPhone}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4">
        Pay
      </a>

      {!submitted ? (
        <button
          onClick={handleConfirm}
          className="block w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          I Have Paid
        </button>
      ) : (
        <p className="text-green-600 font-medium mt-4">
          Payment confirmation submitted. Please wait for admin approval.
        </p>
      )}
    </div>
  );
}

export default ManualPaymentPage;
