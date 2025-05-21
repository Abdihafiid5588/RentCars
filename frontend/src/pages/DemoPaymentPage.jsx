import { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../components/sideNav";

function DemoPaymentPage() {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my-latest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaymentInfo(res.data);
      } catch (err) {
        console.error("Fetch booking failed", err);
      }
    };
    fetchBooking();
  }, []);

  const handleFakePayment = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/demo",
        {
          bookingId: paymentInfo.bookingId,
          amount: paymentInfo.amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Demo Payment Successful!");
      setConfirmed(true);
    } catch (err) {
      alert("❌ Payment Failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-[20%] bg-white min-h-screen border-r shadow">
        <Sidenav />
      </div>

      <div className="w-[80%] p-10">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">🧾 Demo Payment</h2>

          {paymentInfo ? (
            <>
              <p className="mb-2 text-gray-700">Booking ID: <strong>{paymentInfo.bookingId}</strong></p>
              <p className="mb-2 text-gray-700">Amount to Pay: <strong>${paymentInfo.amount}</strong></p>

              {!confirmed ? (
                <button
                  onClick={handleFakePayment}
                  disabled={loading}
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {loading ? "Processing..." : "Simulate Payment"}
                </button>
              ) : (
                <p className="text-green-600 mt-4 text-center">✅ Payment Confirmed</p>
              )}
            </>
          ) : (
            <p className="text-gray-400">Loading booking info...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DemoPaymentPage;
