import { FaCar, FaUserCircle, FaClock, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full h-full">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <FaUserCircle className="text-5xl text-blue-500 mb-2" />
        <h2 className="text-lg font-semibold text-gray-700">Welcome, User</h2>
        <p className="text-sm text-gray-400">user@email.com</p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-3 text-blue-600 font-medium hover:underline">
          <FaCar />Bookings
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:underline">
          <FaCar /> My Bookings
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
          <FaClock /> Booking History
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
          <FaCreditCard /> Payments
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
          <FaUserCircle /> Profile
        </a>
        <a href="#" className="flex items-center gap-3 text-red-500 hover:underline">
          <FaSignOutAlt /> Logout
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
