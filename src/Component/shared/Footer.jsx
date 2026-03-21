import { FaFacebookF, FaGithub, FaLinkedinIn, FaRegEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)] pt-16 pb-8 border-t border-[var(--primary)]/10 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-wrap justify-between items-start mb-12 gap-10">

          {/* Brand Section */}
          <div className="w-full md:w-1/3">
            <Link to="/" className="group inline-block mb-6">
              <h3 className="text-3xl font-black tracking-tighter transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r from-[#D4AF37] via-[#F2CC8F] to-[#C5A059] bg-clip-text text-transparent ml-1">
                 TRAVEL EASE
              </h3>
            </Link>
            <p className="text-sm leading-relaxed mb-8 opacity-70 max-w-sm">
              Making your journeys memorable with premium car rentals since 2010. 
              Your comfort and safety are our top priorities. Experience luxury on every mile.
            </p>
            
            <div className="space-y-4 text-sm font-medium">
              <p className="flex items-center gap-4 group cursor-pointer">
                <span className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)] group-hover:text-[#0A0F14] transition-all duration-300">
                  <FaRegEnvelope />
                </span>
                <span className="opacity-80">nssiam99@gmail.com</span>
              </p>
              <p className="flex items-center gap-4 group cursor-pointer">
                <span className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)] group-hover:text-[#0A0F14] transition-all duration-300">
                  <FaPhone />
                </span>
                <span className="opacity-80">+880 1881361160</span>
              </p>
              <p className="flex items-center gap-4 group cursor-pointer">
                <span className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)] group-hover:text-[#0A0F14] transition-all duration-300">
                  <FaMapMarkerAlt />
                </span>
                <span className="opacity-80">Gafargaon, Mymensingh</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-1/2 md:w-1/6">
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-[var(--primary)]">Explore</h4>
            <ul className="space-y-4 text-sm font-semibold opacity-70">
              <li><Link to="/" className="hover:text-[var(--primary)] hover:ml-2 transition-all duration-300">Home</Link></li>
              <li><Link to="/allVehicles" className="hover:text-[var(--primary)] hover:ml-2 transition-all duration-300">All Vehicles</Link></li>
              <li><Link to="/about" className="hover:text-[var(--primary)] hover:ml-2 transition-all duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--primary)] hover:ml-2 transition-all duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-[var(--primary)]">Connect</h4>
            <p className="text-sm opacity-70 mb-6">Follow our official handles for the latest luxury fleet updates and exclusive offers.</p>
            <div className="flex space-x-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/siam-khan-alt" },
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/siam-khan-sp99/" },
                { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=100078237812772" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 rounded-full border border-[var(--primary)]/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-[#0A0F14] hover:border-transparent transition-all duration-500 shadow-lg hover:shadow-[var(--primary)]/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="text-center pt-8 border-t border-[var(--primary)]/5">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
            &copy; {new Date().getFullYear()} <span className="text-[var(--primary)] font-bold">TravelEase</span>. 
            Refined by <span className="hover:text-[var(--primary)] cursor-pointer transition-colors">Siam Khan</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;