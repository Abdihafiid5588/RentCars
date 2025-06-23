// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="w-full px-4 md:px-20 py-6 flex items-center justify-between bg-white shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
        <h1 className="text-[#1572D3] font-bold text-lg">RENTCARS</h1>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex font-semibold gap-10 text-gray-600">
        <li className="hover:text-[#1572D3]">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-[#1572D3]">
          <a href="#rental-deals">Rental Deals</a>
        </li>
        <li className="hover:text-[#1572D3]">
          <a href="#how-it-works">How it works</a>
        </li>
        <li className="hover:text-[#1572D3]">
          <a href="#why-choose-us">Why choose us</a>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4">
        <Link to="/login">
          <button className="border border-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-100">
            Sign in
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-[#1572D3] text-white py-1.5 px-5 rounded hover:bg-blue-600">
            Sign up
          </button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white flex flex-col p-6 gap-4 text-gray-700 font-semibold z-50 overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#rental-deals" onClick={() => setIsOpen(false)}>Rental Deals</a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)}>How it works</a>
          <a href="#why-choose-us" onClick={() => setIsOpen(false)}>Why choose us</a>

          <hr />

          <Link to="/login" onClick={() => setIsOpen(false)}>
            <button className="border py-2 rounded hover:bg-blue-100 w-full">Sign in</button>
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            <button className="bg-[#1572D3] text-white py-2 rounded hover:bg-blue-600 w-full">Sign up</button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
