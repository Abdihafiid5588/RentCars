import { useState } from "react";
import { FaSearch, FaTag } from "react-icons/fa";

function CarSearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const availableTags = ["Luxury", "Electric", "SUV", "Family", "Economy", "Sport"];

  const handleSearch = () => {
    onSearch({
      keyword: keyword.trim(),
      tag: selectedTag
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center gap-3 bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
        <FaSearch className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none text-gray-700"
        />

        <div className="relative">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none text-gray-700"
          >
            <option value="">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default CarSearchBar;
