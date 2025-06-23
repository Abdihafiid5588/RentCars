import Audi from "../images/Audi 1.png";

function WhyChooseUs() {
  return (
    <div id="why-choose-us" className="px-4 sm:px-6 lg:px-20 py-10">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <img src={Audi} alt="Audi Car" className="w-full max-w-[600px] mx-auto" />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#E8F1FB] w-fit px-4 py-2 rounded-md text-blue-500 font-bold text-lg mb-4">
            <h1>Why Choose Us</h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 max-w-md">
            We offer the best experience with our rental deals
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Best price guaranteed",
                desc: "Find a lower price? We’ll refund you 100% of the difference.",
              },
              {
                title: "Experienced driver",
                desc: "Don’t have a driver? Don’t worry, we have many experienced drivers for you.",
              },
              {
                title: "24 hour car delivery",
                desc: "Book your car anytime and we will deliver it directly to you.",
              },
              {
                title: "24/7 technical support",
                desc: "Have a question? Contact Rentcars support any time you need help.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-[#E8F1FB] p-4 rounded-md">
                  <i className="fa-solid fa-circle-check text-2xl text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
