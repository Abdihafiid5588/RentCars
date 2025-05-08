
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

function Header(){
    return <div className="flex justify-between px-20 py-6 items-center">
        <div className="flex gap-2">
            <img src={Logo} alt="" />
            <h1 className="text-[#1572D3] font-bold">RENTCARS</h1>
        </div>
        <ul className="flex font-semibold gap-10 text-gray-500">
            <li>Become a renter</li>
            <li>Rental Deals</li>
            <li>How it work</li>
            <li>Why choose us</li>
        </ul>

        <div className="flex gap-4">
           <Link to={"/login"}> <button className="text-gray-500 font-semibold mt-1 border py-1 px-6 cursor-pointer hover:bg-blue-500">Sign in</button></Link>
          <Link to={"/register"}>  <button className="bg-[#1572D3] py-2 px-5 rounded-sm text-white font-semibold cursor-pointer">Sign up</button></Link>
        </div>
        
    </div>

}

export default Header;