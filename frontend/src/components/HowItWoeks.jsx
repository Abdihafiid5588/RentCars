function HowItWorks() {
    return (
      
      <div id="how-it-works" className="bg-white p-6 sm:p-10 md:p-12">
        
        <div className="flex justify-center">
          <div className="bg-[#E8F1FB] h-9 w-40 text-center pt-1 rounded-md text-blue-500 font-semibold text-[14px] sm:text-[16px] md:text-[18px]">
            <h1>HOW IT WORKS</h1>
          </div>
        </div>
  
        <div className="flex justify-center py-6 sm:py-8 md:py-10">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            Rent with the following 3 working steps
          </h1>
        </div>
  
        <div className="flex flex-col sm:flex-row justify-around pt-10 sm:pt-12 md:pt-16">
          {/* Step 1 */}
          <div className="flex flex-col items-center mb-6 sm:mb-0">
            <div className="bg-[#E8F1FB] h-18 w-24 text-center pt-6 rounded-md">
              <i className="fa-solid fa-circle-check text-3xl text-blue-500"></i>
            </div>
            <h1 className="font-semibold text-xl sm:text-2xl mt-4">Choose a car</h1>
            <p className="mt-2 text-gray-500 text-center">Find the best car you want</p>
          </div>
  
          {/* Step 2 */}
          <div className="flex flex-col items-center mb-6 sm:mb-0">
            <div className="bg-[#E8F1FB] h-18 w-24 text-center pt-6 rounded-md">
              <i className="fa-solid fa-calendar-days text-blue-500 text-3xl"></i>
            </div>
            <h1 className="font-semibold text-xl sm:text-2xl mt-4">Pick-up your date</h1>
            <p className="mt-2 text-gray-500 text-center">
              Find the best car you want and <span className="text-black">rent</span> it.
            </p>
          </div>
  
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#E8F1FB] h-18 w-24 text-center pt-6 rounded-md">
              <i className="fa-solid fa-car text-blue-500 text-3xl"></i>
            </div>
            <h1 className="font-semibold text-xl sm:text-2xl mt-4">Book your car</h1>
            <p className="mt-2 text-gray-500 text-center">
              Find the best car you want and <span className="text-black">rent</span> it.
            </p>
          </div>
        
        </div>
      </div>
    );
  }
  
  export default HowItWorks;
  