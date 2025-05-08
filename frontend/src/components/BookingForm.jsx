import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm({ onSearch }) {
  const [carType, setCarType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);

  const handleSearch = () => {
    onSearch({ carType, pickupLocation, dropoffLocation, pickupDate, dropoffDate });
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-6xl mx-auto border border-blue-100 mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Book a car</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Car Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <i className="fa fa-car text-blue-500 mr-1"></i> Car Type
          </label>
          <select
            className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-400"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="">Select Car</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Economy">Economy</option>
          </select>
        </div>

        {/* Pickup & Dropoff */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <i className="fa fa-map-marker-alt text-blue-500 mr-1"></i> Pick-up
          </label>
          <input
            type="text"
            placeholder="Enter Pickup Location"
            className="w-full p-2 border border-blue-200 rounded"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <i className="fa fa-map-marker-alt text-blue-500 mr-1"></i> Drop-off
          </label>
          <input
            type="text"
            placeholder="Enter Drop-off Location"
            className="w-full p-2 border border-blue-200 rounded"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
        </div>

        {/* Dates */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <i className="fa fa-calendar text-blue-500 mr-1"></i> Pick-up Date
          </label>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            placeholderText="Pick-up"
            className="w-full p-2 border border-blue-200 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            <i className="fa fa-calendar-alt text-blue-500 mr-1"></i> Drop-off Date
          </label>
          <DatePicker
            selected={dropoffDate}
            onChange={(date) => setDropoffDate(date)}
            placeholderText="Drop-off"
            className="w-full p-2 border border-blue-200 rounded"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
