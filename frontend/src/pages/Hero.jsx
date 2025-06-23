import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { Typewriter } from 'react-simple-typewriter';
import Car1 from "../images/car1.png";

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden mt-20">
      {/* Top Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-20 px-6 md:px-10 gap-12">
        
        {/* Left Text */}
        <div className="max-w-xl flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Find, book and rent a car{" "}
            <span className="text-[#1572D3] inline-block">
              <Typewriter
                words={['Easily', 'Perfectly', 'Quickly', 'Affordably', 'Smoothly']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={0}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p className="text-base sm:text-lg mt-6 mb-8 text-gray-700">
            Get a car wherever and whenever you <br className="hidden sm:block" /> need it with your iOS and Android device.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {[...Array(2)].map((_, index) => (
              <button
                key={index}
                className="bg-black py-2 px-4 rounded-sm text-white flex items-center gap-2"
              >
                <div className="text-[10px] leading-tight text-left">
                  <h2 className="text-[8px]">Get it on</h2>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
                <FontAwesomeIcon icon={faGooglePlay} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-carSlideIn">
          <img
            src={Car1}
            alt="Car"
            className="w-[90%] max-w-[600px] h-auto object-contain hover:animate-carFloat"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
