import PopularRental from "../components/PopularRental";
import car1 from "../images/image 12.png";
import car2 from "../images/image 12.png";
import car3 from "../images/image 13.png";
import car4 from "../images/image 11.png";

const popularCars = [
  {
    image: car1,
    carName: "BMW M3",
    rate: "4.7 (200 reviews)",
    passengers: "4 passengers",
    carType: "Sports",
    airConditionair: "AC",
    nDoors: "2 Doors",
    price: "$1,600",
  },
  {
    image: car2,
    carName: "Audi R8",
    rate: "4.9 (220 reviews)",
    passengers: "2 passengers",
    carType: "Luxury",
    airConditionair: "AC",
    nDoors: "2 Doors",
    price: "$2,100",
  },
  {
    image: car3,
    carName: "Audi R8",
    rate: "4.9 (220 reviews)",
    passengers: "2 passengers",
    carType: "Luxury",
    airConditionair: "AC",
    nDoors: "2 Doors",
    price: "$2,100",
  },
  {
    image: car4,
    carName: "Audi R8",
    rate: "4.9 (220 reviews)",
    passengers: "2 passengers",
    carType: "Luxury",
    airConditionair: "AC",
    nDoors: "2 Doors",
    price: "$2,100",
  },
];

function PopularRentalSection() {
  return (
    <div id="rental-deals"  className="text-center mt-20 px-4 sm:px-6 lg:px-10 ml-5">
      {/* Section Title */}
      <div className="bg-[#E8F1FB] w-fit mx-auto px-4 py-1 rounded-md mb-4">
        <h2 className="text-blue-500 font-serif font-semibold text-base sm:text-lg md:text-xl">
          Our Car models
        </h2>
      </div>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8">
        Most popular cars rental deals.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularCars.map((car, idx) => (
          <PopularRental key={idx} {...car} />
        ))}
      </div>
    </div>
  );
}

export default PopularRentalSection;
