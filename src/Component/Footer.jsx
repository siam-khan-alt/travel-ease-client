import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-[#3D405B] dark:bg-[#2B2D42] text-[#F2CC8F] dark:text-[#F4F1DE] py-5 md:py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
      
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">
            <span className="text-[#E07A5F]">Travel</span>
            <span className="text-[#F2CC8F]">Ease</span>
          </h1>
          <p className="text-sm">
            © 2025 TravelEase. All rights reserved.
          </p>
        </div>

      
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Link className="hover:text-[#E07A5F] transition-colors duration-200" to="/">Home</Link>
          <Link className="hover:text-[#E07A5F] transition-colors duration-200" to="/allVehicles">All Vehicles</Link>
          <Link className="hover:text-[#E07A5F] transition-colors duration-200" to="/addVehicle">Add Vehicle</Link>
          <Link className="hover:text-[#E07A5F] transition-colors duration-200" to="/myBookings">My Bookings</Link>
        </div>

        
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E07A5F] dark:hover:text-[#F2CC8F] transition-colors duration-200">
    <FaFacebookF size={20} />
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E07A5F] dark:hover:text-[#F2CC8F] transition-colors duration-200">
    <FaInstagram size={20} />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E07A5F] dark:hover:text-[#F2CC8F] transition-colors duration-200">
    <FaXTwitter size={20} />
  </a>
</div>

        </div>
      </div>

    
      <div className="mt-6 border-t border-[#F2CC8F] dark:border-[#E07A5F] pt-4 text-center text-sm text-[#F2CC8F]">
        Designed & Developed by Siam Khan
      </div>
    </footer>
  );
};

export default Footer;
