import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/add-car" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Add New Car</h2>
          <p>Add a new vehicle to the booking system</p>
        </Link>

        <Link to="/admin/manage-cars" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Manage Cars</h2>
          <p>Edit or delete existing car listings</p>
        </Link>

        <Link to="/admin/bookings" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">All Bookings</h2>
          <p>View all customer bookings</p>
        </Link>

        <Link to="/admin/promote" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Promote User</h2>
          <p>Upgrade user accounts to admin status</p>
        </Link>
        <Link to="/admin/summary" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">See Summary</h2>
          <p>Admin Summary</p>
        </Link>
        <Link to="/admin/payments" className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border hover:border-blue-600 transition-all">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Admin Approval</h2>
          <p>Admin Summary</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
