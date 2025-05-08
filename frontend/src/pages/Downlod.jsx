import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay,  } from '@fortawesome/free-brands-svg-icons';
import {  faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import iPhone from "../images/iPhone 14 Pro .png"


function Dowload(){

    return <div >
        <div className="flex justify-center mt-32 gap-[130px]">
        <div className=" mt-[50px]">
        <h1><span className="bg-blue-300 px-4 py-2 rounded">DOWNLOAD</span></h1>
        <h1 className=" mt-3 text-3xl font-bold">Download Rentcars <br /> App for <span className="text-blue-400">FREE</span></h1>
        <p className=" mt-2 font-medium cs">For faster, easier booking and exclusive deals.</p>
        <div className="flex gap-4 mt-3">
        <button className="bg-black py-1 px-3 rounded-sm text-white"> <h2 className="text-[8px]">Get it on</h2><FontAwesomeIcon icon={faGooglePlay} className="text-[#3DDC84]" /> Google Play</button>
        <button className="bg-black py-1 px-3 rounded-sm text-white"> <h2 className="text-[8px]">Get it on</h2><FontAwesomeIcon icon={faGooglePlay} className="text-blue-800" /> Google Play</button>
        
        </div>


        </div>
        
                

        <div>

                    <img src={iPhone} alt="" />
        </div>

        </div>







    </div>
}
export default Dowload