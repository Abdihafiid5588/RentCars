// ✅ pages/ProfilePage.jsx (Improved UI + Backend Integration)
import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../components/sideNav";

function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setName(res.data.name);
        if (res.data.profileImage) {
          setPreviewUrl(`http://localhost:5000/uploads/profile/${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    if (profileImage) formData.append("profileImage", profileImage);

    setLoading(true);
    try {
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Profile updated successfully!");
      window.dispatchEvent(new Event("profile-updated"));
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-white shadow-md border-r border-gray-200">
        <Sidenav />
      </div>

      {/* Profile Form */}
      <div className="w-[80%] p-10">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">👤 Profile Settings</h2>

          <div className="flex flex-col items-center mb-6">
            {previewUrl ? (
              <img
                src={previewUrl}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md mb-3"
                alt="Profile Preview"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-3">
                No image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full border px-3 py-2 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
