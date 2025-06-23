// components/CarSearchBar.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function CarSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center gap-2 bg-white p-3 m-10 border border-gray-400 shadow-sm rounded-lg w-full max-w-xl mb-6">
      <FaSearch className="text-gray-400 text-lg" />
      <input
        type="text"
        placeholder="Search by car name or model..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow outline-none text-gray-700 placeholder-gray-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default CarSearchBar;
