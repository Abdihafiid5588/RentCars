import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay,  } from '@fortawesome/free-brands-svg-icons';
import {  faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Car1 from "../images/car1.png"
import Bg from "../images/bg.png"
function Hero() {
    return <div>
        <div className='flex justify-around py-20 relative'>
        <div className='mr-[700px]'>
        <h1 className='text-6xl font-bold w-[500px]'>Find, book and rent a car <span className='text-[#1572D3]'>Easily</span></h1>
        <p className=' text-[17px] mb-8 mt-8'>Get a car wherever and whenever you <br /> need it with your IOS and Android device.</p>
        <div className="flex gap-4">
            <button className='bg-black py-1 px-3 rounded-sm text-white'> <h2 className='text-[8px]'>Get it on</h2><FontAwesomeIcon icon={faGooglePlay} /> Google Play</button>
            <button className='bg-black py-1 px-3 rounded-sm text-white'> <h2 className='text-[8px]'>Get it on</h2><FontAwesomeIcon icon={faGooglePlay} /> Google Play</button>
        </div>
        </div>

        <div className='absolute right-0 top-[-4]'>
            <img src={Car1} className='w-[800px]' />
        </div>

      
        </div>

            
        <div className='bg-[#E8F1FB] rounded-lg w-[1230px] h-16 ml-38 mt-32 flex gap-20'>
        <div className='flex gap-4 items-center pl-3 py-1'>
        <FontAwesomeIcon icon={faLocationDot} className='text-3xl text-gray-500 '/>
        <div>
        <h1 className='font-bold text-[17px]'>location</h1>
        <p  className='text-gray-500 font-semibold text-[13px]'>Search your location</p>
        </div>
        </div>
        <div className='flex gap-4 items-center pl-3 py-1'>
        <FontAwesomeIcon icon={faCalendarDays} className='text-3xl  text-gray-500 '/>
        <div>
        <h1 className='font-bold text-[17px]'>Pickup date</h1>
        <p  className='text-gray-500 font-semibold text-[13px]'>Search your location</p>
        </div>
        </div>
        <div className='flex gap-4 items-center pl-3 py-1'>
        <FontAwesomeIcon icon={faCalendarDays} className='text-3xl  text-gray-500 '/>
        <div>
        <h1 className='font-bold text-[17px]'>Return date</h1>
        <p  className='text-gray-500 font-semibold text-[13px]'>Search your location</p>
        </div>
        <div>
        <button className="bg-[#1572D3] ml-96 py-2 px-5 rounded-sm text-white font-semibold">Explore</button>
        </div>
        </div>
        </div>

    </div>
}

export default Hero