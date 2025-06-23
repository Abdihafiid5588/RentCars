// AdminPaymentApprovalPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function AdminPaymentApprovalPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/payments/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Fetch payments failed:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/payments/approve/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPayments();
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Pending Payments</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">No pending payments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div key={payment._id} className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {payment.user?.name || "User"} - ${payment.amount}
              </h3>
              <p className="text-sm text-gray-600">Email: {payment.user?.email}</p>
              <p className="text-sm text-gray-600">Phone: {payment.phone}</p>
              <p className="text-sm text-gray-600">Method: {payment.method}</p>
              <p className="text-sm text-gray-600 mb-3">
                Booking ID: {payment.booking?._id || "N/A"}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusChange(payment._id, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(payment._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPaymentApprovalPage;
