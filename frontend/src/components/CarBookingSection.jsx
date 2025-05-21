import { useState } from "react";
import CarBookingModal from "../components/carBookingPopUp";

function CarBookingSection({ cars }) {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Available Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-gray-100">
              {car.imageUrl ? (
                <img
                  src={`http://localhost:5000${car.imageUrl}`}
                  alt={car.model}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-500">
                💵 ${car.pricePerDay} / day
              </p>
              <p className="text-sm text-gray-500">
                🛢 {car.fuelType} | 👥 {car.seats} seats
              </p>
              <p className="text-sm text-gray-500">
                ⚙️ Features: {car.features?.join(", ") || "N/A"}
              </p>
              <button
                onClick={() => setSelectedCar(car)}
                className="mt-3 bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
              >
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <CarBookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onBooked={() => {
            setSelectedCar(null);
            // Optional: you can trigger a re-fetch or update here
          }}
        />
      )}

      {cars.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No cars available at the moment.</p>
      )}
    </div>
  );
}

export default CarBookingSection;
