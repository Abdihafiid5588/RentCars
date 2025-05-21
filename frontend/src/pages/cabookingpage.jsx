// pages/CarBookingPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import CarSearchBar from "../components/CarSearchBar";
import CarBookingSection from "../components/CarBookingSection"; // your current display component

function CarBookingPage() {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars", {
        params: query ? { search: query } : {},
      });
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [query]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CarSearchBar onSearch={setQuery} />
      <CarBookingSection cars={cars} />
    </div>
  );
}

export default CarBookingPage;
