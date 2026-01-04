import { FaFacebookF, FaGithub, FaLinkedinIn,  FaRegEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-[#3D405B] dark:bg-[#0F172A] text-[#F2CC8F] pt-12 pb-6 transition-colors duration-300">
            <div className="container mx-auto px-4">
                
                <div className="flex flex-wrap justify-between items-start mb-10 gap-8">

                    <div className="w-full md:w-1/3">
                        <h3 className="text-3xl font-bold mb-4 font-serif">
                            <span className="text-[#E07A5F]">Travel</span>
                            <span className="text-[#F2CC8F]">Ease</span>
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 text-gray-300 opacity-90">
                            Making your journeys memorable with premium car rentals since 2010. 
                            Your comfort and safety are our top priorities. Find your perfect ride today.
                        </p>
                        
                        <div className="space-y-3 text-sm text-gray-300">
                            <p className="flex items-center gap-3">
                                <FaRegEnvelope className="text-[#E07A5F]" />
                                <span>nssiam99@gmail.com</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaPhone className="text-[#E07A5F]" />
                                <span>+880 1881361160</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-[#E07A5F]" />
                                <span>Gofforgaoun, Mymensingh</span>
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 md:w-1/6">
                        <h4 className="text-lg font-bold mb-4 text-white">Explore</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/" className="hover:text-[#E07A5F] transition-colors">Home</Link></li>
                            <li><Link to="/allVehicles" className="hover:text-[#E07A5F] transition-colors">All Vehicles</Link></li>
                            <li><Link to="/about" className="hover:text-[#E07A5F] transition-colors">About Us</Link></li>
                            
                        </ul>
                    </div>

                    <div className="w-full md:w-1/4">
                        <h4 className="text-lg font-bold mb-4 text-white">Connect with Us</h4>
                        <p className="text-sm text-gray-300 mb-4">Follow our official handles for the latest updates and offers.</p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://github.com/siam-khan-alt" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] hover:text-white transition-all"
                            >
                                <FaGithub size={20} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/siam-khan-sp99/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] hover:text-white transition-all"
                            >
                                <FaLinkedinIn size={20} />
                            </a>
                            <a 
                                href="https://www.facebook.com/profile.php?id=100078237812772" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] hover:text-white transition-all"
                            >
                                <FaFacebookF size={20} />
                            </a>
                        </div>
                    </div>

                </div>
                
                <div className="text-center pt-8 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} <span className="text-[#E07A5F] font-bold">TravelEase</span>. All rights reserved. 
                        Developed by Siam Khan.
                    </p>
                </div>
            </div>
        </footer>
  );
};

export default Footer;
