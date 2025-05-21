import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import iPhone from "../images/iPhone 14 Pro .png";

function Download() {
  return (
    <div className="px-4 sm:px-6 lg:px-20 py-10">
      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-32 items-center">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h1 className="bg-blue-300 px-4 py-2 rounded inline-block">DOWNLOAD</h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
            Download Rentcars <br /> App for <span className="text-blue-400">FREE</span>
          </h2>
          <p className="mt-2 font-medium text-lg">For faster, easier booking and exclusive deals.</p>
          
          {/* Buttons */}
          <div className="flex justify-center lg:justify-start gap-4 mt-4">
            <button className="bg-black py-2 px-4 rounded-sm text-white flex items-center gap-2">
              <h2 className="text-[8px]">Get it on</h2>
              <FontAwesomeIcon icon={faGooglePlay} className="text-[#3DDC84]" />
              Google Play
            </button>
            <button className="bg-black py-2 px-4 rounded-sm text-white flex items-center gap-2">
              <h2 className="text-[8px]">Get it on</h2>
              <FontAwesomeIcon icon={faGooglePlay} className="text-blue-800" />
              Google Play
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="mt-8 lg:mt-0">
          <img src={iPhone} alt="iPhone" className="w-full max-w-[400px] mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default Download;
