// pages/ManualPaymentWrapper.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../components/sideNav";
import ManualPaymentPage from "./paypage"; // ✅ or wherever your component lives

function ManualPaymentWrapper() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/bookings/my-latest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch latest booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooking();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-white shadow-md border-r border-gray-200">
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-8">
        {loading ? (
          <p className="text-gray-500">Loading payment details...</p>
        ) : data ? (
          <ManualPaymentPage bookingId={data.bookingId} amount={data.amount} />
        ) : (
          <p className="text-red-500">No booking found. Please create a booking first.</p>
        )}
      </div>
    </div>
  );
}

export default ManualPaymentWrapper;
