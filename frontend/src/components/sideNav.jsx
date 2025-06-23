// ✅ Sidebar.jsx
import { Link } from "react-router-dom";
import {
  FaCar, FaClock, FaCreditCard, FaSignOutAlt, FaUserCircle, FaChartPie,
  FaUser
} from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  const [user, setUser] = useState({ name: "", email: "", imageUrl: "" });

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser({ name: decoded.name || "User", email: decoded.email });
      }
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("profile-updated", fetchUser);
    return () => window.removeEventListener("profile-updated", fetchUser);
  }, []);

  const profileLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";
  const profileImageSrc = user.profileImage ? `http://localhost:5000/uploads/profile/${user.profileImage}` : null;
  return (
    <div className="bg-white shadow-md rounded-xl py-8 px-4 w-full h-full flex flex-col items-center">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            className="w-16 h-16 rounded-full object-cover border"
            alt="User"
          />
        ) : (
          <div className="bg-blue-500 text-white text-2xl font-semibold w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105">
            {profileLetter}
          </div>
        )}
        <h2 className="mt-3 text-[18px] font-bold text-gray-800">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="w-full space-y-4 ">
        <SidebarLink to="/booking" icon={<FaCar />} label="Book" />
        <SidebarLink to="/my-bookings" icon={<FaUser />} label="My Bookings" />
        <SidebarLink to="/summary" icon={<FaChartPie />} label="Booking Summary" />
        {/* <SidebarLink to="/payment/:bookingId" icon={<FaCreditCard />} label="Pay & Activate" /> */}
        <SidebarLink to="/profile" icon={<FaUserCircle />} label="Profile" />
        <SidebarLink to="/pay" icon={<FaCreditCard />} label="Payment"  />
        <SidebarLink to="/login" icon={<FaSignOutAlt />} label="Logout" danger />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, label, active = false, danger = false }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg transition
        ${danger
          ? 'text-red-500 hover:bg-red-50'
          : active
          ? 'text-blue-600 font-semibold hover:bg-blue-50'
          : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[15px]">{label}</span>
    </Link>
  );
}

export default Sidebar;
