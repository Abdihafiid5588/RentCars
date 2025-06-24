import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Registration failed");
    }
  }
  //h

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        className="w-full max-w-md p-8 bg-gradient-to-tr from-gray-200 via-gray-200 to-blue-100 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
