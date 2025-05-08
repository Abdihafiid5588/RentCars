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
    <div className="text-center mt-20">
      <div className="bg-[#E8F1FB] h-13 w-60 text-center pt-1 rounded-md text-blue-500 font-semibold font-serif text-[26px] mx-auto mb-10">
        HOW IT WORKS
      </div>
      <p className="text-2xl mb-10">Most popular cars rental deals.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
        {popularCars.map((car, idx) => (
          <PopularRental key={idx} {...car} />
        ))}
      </div>
    </div>
  );
}

export default PopularRentalSection;
