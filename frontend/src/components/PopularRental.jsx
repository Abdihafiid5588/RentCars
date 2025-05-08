function PopularRental(props) {
    return (
      <div className="bg-white h-full w-78 py-4 px-6 rounded-sm text-left drop-shadow-2xl shadow-gray-700">
        <img src={props.image} alt={props.carName} className="mb-4 " />
        <h1>{props.carName}</h1>
        <p className="font-bold mt-4 text-gray-400">
          <i className="fa-solid fa-star text-[14px]"></i> {props.rate}
        </p>
  
        <div className="flex gap-5 mt-3 text-gray-400">
          <h1><i className="fa-solid fa-user"></i> {props.passengers}</h1>
          <h1><i className="fa-solid fa-car"></i> {props.carType}</h1>
        </div>
  
        <div className="flex gap-4 text-gray-400 mt-3">
          <h1><i className="fa-solid fa-snowflake"></i> {props.airConditionair}</h1>
          <h1><i className="fa-solid fa-door-closed"></i> {props.nDoors}</h1>
        </div>
  
        <hr className="mt-9" />
        <div className="flex justify-between px-2 mt-4 text-gray-500">
          <p>Price</p>
          <p className="font-bold text-black">
            {props.price} <span className="text-gray-400 font-normal">/day</span>
          </p>
        </div>
  
        <button className="py-2 px-20 bg-blue-500 mt-6 rounded-full text-white font-bold">
          Rent Now
        </button>
      </div>
    );
  }
  
  export default PopularRental;
  