import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { 
  FaThLarge, FaPlusCircle, FaCar, FaBookmark, 
  FaUserCircle, FaHome, FaSignOutAlt, FaBars 
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { users, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handletheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
   Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your dashboard!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E07A5F',
      cancelButtonColor: '#3D405B',
      confirmButtonText: 'Yes, Logout!',
      background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
      color: theme === 'dark' ? '#F4F1DE' : '#3D405B',
    }).then((result) => {
      if (result.isConfirmed) {
        Logout()
          .then(() => {
            Swal.fire({
              title: 'Logged Out!',
              text: 'Redirecting to home...',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
              color: theme === 'dark' ? '#F4F1DE' : '#3D405B',
            });
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.message,
              background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
              color: theme === 'dark' ? '#F4F1DE' : '#3D405B',
            });
          });
      }
    });
  };

  const menuItems = (
    <>
      <NavLink to="/dashboard/home" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaHome /> Back to Home
      </NavLink>
      <NavLink to="/dashboard/home" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaThLarge /> Overview
      </NavLink>
      <NavLink to="/dashboard/add-vehicle" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaPlusCircle /> Add Vehicle
      </NavLink>
      <NavLink to="/dashboard/my-vehicles" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaCar /> My Vehicles
      </NavLink>
      <NavLink to="/dashboard/my-bookings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaBookmark /> My Bookings
      </NavLink>
      <div className="border-t border-gray-600 my-4"></div>
      <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-[#E07A5F] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-700 text-gray-300'}`}>
        <FaUserCircle /> My Profile
      </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F1DE] dark:bg-[#1E293B]">
      <aside className="w-72 bg-[#3D405B] dark:bg-[#1E293B] text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8">
          <Link to="/" className="text-2xl font-black flex items-center gap-2">
            <span className="text-[#E07A5F]">Travel</span>
            <span className="text-[#F2CC8F]">Ease</span>
          </Link>
          <p className="text-[10px] uppercase tracking-[3px] text-gray-400 mt-1 font-bold">User Dashboard</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 font-medium">
          {menuItems}
        </nav>

        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition text-sm font-bold text-gray-200">
            <FaHome /> Back to Home
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-[#F4F1DE] dark:bg-[#1E293B] shadow-sm flex items-center justify-between px-6 md:px-10 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-[#3D405B] dark:text-white">
              <FaBars size={20} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-[#3D405B] dark:bg-[#1E293B] text-white rounded-2xl w-64 space-y-2">
              {menuItems}
            </ul>
          </div>

          <h2 className="text-xl font-bold text-[#3D405B] dark:text-white hidden md:block">
             User Management Panel
          </h2>

          <div className="flex items-center gap-6">
            <label className="toggle text-base-content">
              <input
                onChange={(e) => handletheme(e.target.checked)}
                type="checkbox"
                checked={theme === "dark"}
                className="theme-controller"
              />
              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>
              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#3D405B] dark:text-white">{users?.displayName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Active User</p>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-[#E07A5F]">
                  <div className="w-10 rounded-full">
                    <img src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"} alt="profile" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white dark:bg-[#1E293B] rounded-xl w-52 border border-gray-100 dark:border-gray-800 text-[#3D405B] dark:text-white font-medium">
                  <li><Link to="/dashboard/profile" className="py-2">Profile Details</Link></li>
                  <li><button onClick={handleLogout} className="py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"><FaSignOutAlt /> Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
             <Outlet />
          </div>
        </main>

        <footer className="p-6 text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800">
          &copy; 2026 TravelEase Dashboard | All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;