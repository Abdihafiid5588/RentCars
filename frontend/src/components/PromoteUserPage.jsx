import { useEffect, useState } from "react";
import axios from "axios";

function PromoteUserPage() {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch users failed:", err);
        setMessage("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handlePromote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/promote",
        { email: selectedEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setSelectedEmail("");
    } catch (err) {
      console.error("Promote Error:", err);
      setMessage("Failed to promote user.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Promote User to Admin</h2>

      <form onSubmit={handlePromote} className="space-y-4">
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Promote
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}

export default PromoteUserPage;
