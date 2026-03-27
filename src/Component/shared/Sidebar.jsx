import { Link, NavLink } from "react-router-dom";
import { 
  FaThLarge, FaCar, FaBookmark, FaUserShield, 
  FaHistory, FaChartLine, FaUsers, FaCheckCircle, FaPlus, 
  FaTimes,
  FaBullhorn,
  FaAd,
  FaStar,
  FaCommentDots,
  FaHeadset
} from "react-icons/fa";
import useRole from "../../Hooks/useRole";

const Sidebar = () => {
  const [role] = useRole();

  const activeClass = "bg-[var(--primary)] text-[#0A0F14] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold";
  const normalClass = "flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-[var(--primary)]/10 text-[var(--text-main)]/80 hover:text-[var(--primary)] font-medium";

  return (
    <aside className="w-72 bg-[var(--card-bg)] border-r border-[var(--primary)]/10 flex flex-col h-full shadow-md relative">
      <div className="p-8 border-b border-[var(--primary)]/5 text-center">
      <div className="absolute right-4 top-4 lg:hidden">
        <label htmlFor="dashboard-drawer" className="btn btn-ghost text-left btn-circle text-[var(--primary)]">
          <FaTimes size={20} />
        </label>
      </div>
        <Link to="/"><h2 className="text-2xl  tracking-tighter uppercase text-gradient-gold">TRAVEL EASE
        </h2></Link>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] font-bold block mt-1">
          {role} Panel
        </span>
      </div>

      <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
        {/* --- Common Routes --- */}
        <NavLink to="/dashboard/overview" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
          <FaThLarge size={18} /> Elite Terminal
        </NavLink>

        {/* ---  User (Customer) Routes --- */}
        {role === "user" && (
          <>
            <NavLink to="/dashboard/my-bookings" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaBookmark /> My Bookings
            </NavLink>
            <NavLink to="/dashboard/payment-history" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaHistory /> Payment History
            </NavLink>
            <NavLink to="/dashboard/wishlist" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaCheckCircle /> Wishlist
            </NavLink>
          </>
        )}

        {/* ---  Host (Owner) Routes --- */}
        {role === "host" && (
          <>
            <NavLink to="/dashboard/add-vehicle" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaPlus /> Add New Vehicle
            </NavLink>
            <NavLink to="/dashboard/my-listings" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaCar /> My Listings
            </NavLink>
            <NavLink to="/dashboard/booking-requests" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaHistory /> Booking Requests
            </NavLink>
            <NavLink to="/dashboard/promotion-request" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaBullhorn /> Asset Promotion
            </NavLink>
            <NavLink to="/dashboard/host-analytics" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaChartLine /> Income Analytics
            </NavLink>
          </>
        )}

        {/* ---  Admin Routes --- */}
        {role === "admin" && (
          <>
            <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaUsers /> Manage Users
            </NavLink>
            <NavLink to="/dashboard/verify-vehicles" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaUserShield /> Verify Vehicles
            </NavLink>
            <NavLink to="/dashboard/manage-promotions" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaAd /> Manage Promotions
            </NavLink>
            <NavLink to="/dashboard/all-bookings" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaBookmark /> All Bookings
            </NavLink>
            <NavLink to="/dashboard/revenue" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
              <FaChartLine /> Platform Revenue
            </NavLink>
            <NavLink to="/dashboard/manage-reviews" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                <FaCommentDots /> Manage Reviews
            </NavLink>
            <NavLink to="/dashboard/manage-contacts" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
    <FaHeadset /> Manage Contacts
</NavLink>
          </>
        )}
        
      </nav>

      {/* --- Profile Bottom --- */}
      <div className="p-6 border-t border-[var(--primary)]/5">
        <NavLink to="/dashboard/web-review" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
        <FaStar /> Feedback
    </NavLink>
        <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? `${normalClass} ${activeClass}` : normalClass}>
           My Profile
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;