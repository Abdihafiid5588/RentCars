import Audi from "../images/Audi 1.png"

function whyChooseUs() {
    return <div className="">
        <div className="flex justify-between pt-20 items-center">
            <div>
                <img src={Audi} alt="" className="w-170" />
            </div>
            <div className="mr-40">
            <div className=" bg-[#E8F1FB] h-12 w-50 text-center pt-2 rounded-md text-blue-500 font-bold text-[20px]"><h1>Why Choose Us</h1></div>
            <h1 className="text-3xl w-[500px] mt-7">We offer the best experience with our rental deals</h1>
            <div className=" pt-10">
                <div className="flex gap-10 ">
                     <div className="bg-[#E8F1FB] h-18 w-23 text-center pt-6 rounded-md"><i class="fa-solid fa-circle-check text-3xl text-blue-500"></i></div>
                     <div>
                        <h1 className="text-[20px] font-semibold">Best price guaranteed</h1>
                        <p  className="text-[13px] w-75">Find a lower price? We’ll refund you 100%
                        of the difference.</p>
                     </div>
                </div >
                <div className="flex gap-10  pt-8">
                     <div className="bg-[#E8F1FB] h-18 w-23 text-center pt-6 rounded-md"><i class="fa-solid fa-circle-check text-3xl text-blue-500"></i></div>
                     <div>
                        <h1 className="text-[20px] font-semibold">Experience driver</h1>
                        <p  className="text-[13px] w-75">Don’t have driver? Don’t worry, we have many
                        experienced driver for you.</p>
                     </div>
                </div>
                <div className="flex gap-10 pt-8">
                     <div className="bg-[#E8F1FB] h-18 w-23 text-center pt-6 rounded-md"><i class="fa-solid fa-circle-check text-3xl text-blue-500"></i></div>
                     <div>
                        <h1 className="text-[20px] font-semibold">24 hour car delivery</h1>
                        <p  className="text-[13px] w-75">Book your car anytime and we will deliver it
                        directly to you.</p>
                     </div>
                </div>
                <div className="flex gap-10 pt-8">
                     <div className="bg-[#E8F1FB] h-18 w-23 text-center pt-6 rounded-md"><i class="fa-solid fa-circle-check text-3xl text-blue-500"></i></div>
                     <div   className="text-[13px] w-75">
                        <h1 className="text-[20px] font-semibold">24/7 technical support</h1>
                        <p>Have a question? Contact Rentcars support
                        any time when you have problem.</p>
                     </div>
                </div>
                
   </div>
            
            </div>
        </div>
        
        </div>

}

export default whyChooseUs
        