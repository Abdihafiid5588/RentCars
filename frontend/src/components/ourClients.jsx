import Marquee from "react-fast-marquee";
import frame1 from "../images/Frame (1).png";
import frame25 from "../images/Frame 25.png";
import frame24 from "../images/Frame 24.png";
import frame26 from "../images/Frame 25.png";
import frame27 from "../images/Frame 27.png";
import frame28 from "../images/Frame 28.png";

function ClientLogos() {
  return (
    <div className="py-8 bg-white">
      <div className="flex justify-center">
      <div className=" bg-[#E8F1FB] text-center h-9 w-40 pt-1 rounded-md text-blue-500 font-semi-bold text-[16px]"><h1 className="">Car Models</h1></div>
      </div>

      <Marquee pauseOnHover={true} speed={70} className="pt-18 ">
        <img src={frame1} alt="Client 2" className="h-20 mx-16" />
        <img src={frame25} alt="Client 3" className="h-20 mx-16" />
        <img src={frame24} alt="Client 4" className="h-20 mx-16" />
        <img src={frame26} alt="Client 1" className="h-20 mx-16" />
        <img src={frame27} alt="Client 1" className="h-20 mx-16" />
        <img src={frame28} alt="Client 1" className="h-20 mx-16" />
        
      </Marquee>
    </div>
  );
}

export default ClientLogos;
