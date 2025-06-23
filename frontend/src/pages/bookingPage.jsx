import Sidenav from '../components/sideNav';
import CarSearchBar from '../components/CarSearchBar';
import CarBookingSection from '../components/CarBookingSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UserBookings from '../components/UserBookings';

function BookingPage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', tag: '' });
  const location = useLocation();

  const fetchCars = async () => {
    try {
      const params = {};
      if (filters.keyword) params.search = filters.keyword;
      if (filters.tag) params.tag = filters.tag;

      const res = await axios.get('http://localhost:5000/api/cars', { params });
      setCars(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[20%] min-h-screen bg-white shadow-md">
        <Sidenav />
      </div>

      {/* Booking Content */}
      <div className="w-[80%] p-6">
        {location.pathname === '/my-bookings' ? (
          <UserBookings />
        ) : (
          <>
            <CarSearchBar onSearch={(filterData) => setFilters(filterData)} />
            <CarBookingSection cars={cars} />
          </>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
