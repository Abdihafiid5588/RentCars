function Footer() {
  return (
    <div className="bg-[#0B1D31] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
        
        {/* Logo and Contact Info */}
        <div>
          <div className="flex gap-2">
            <h1 className="text-white font-bold text-xl">RENTCARS</h1>
          </div>
          
          <div className="space-y-4 text-gray-300 mt-5">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-location-dot text-2xl"></i>
              <p>25566 Hc 1, Glennallen, Alaska, 99588, USA</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-2xl"></i>
              <p>+603 4784 273 12</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-message text-2xl"></i>
              <p>rentcars@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold mb-4 ml-3">Our Product</h3>
          <ul className="space-y-2 ml-3">
            <li><a href="#">Career</a></li>
            <li><a href="#">Car</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Priceline</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#">Download</a></li>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">Partner Network</a></li>
            <li><a href="#">Cruises</a></li>
            <li><a href="#">Developer</a></li>
          </ul>
        </div>

        {/* About Rentcars Links */}
        <div>
          <h3 className="font-semibold mb-4">About Rentcars</h3>
          <ul className="space-y-2">
            <li><a href="#">Why choose us</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Press Center</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-300">
            <i className="fa-brands fa-facebook text-2xl"></i>
            <i className="fa-brands fa-twitter text-2xl"></i>
            <i className="fa-brands fa-youtube text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xs">
        <p>Copyright 2025 • Rentcars, All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
