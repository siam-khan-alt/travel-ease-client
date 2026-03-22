import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FaThLarge, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { users, Logout } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D4AF37',
      cancelButtonColor: '#1E293B', 
      confirmButtonText: 'Yes, Logout!',
      background: theme === 'dark' ? '#0A0F14' : '#FFFFFF',
      color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
    }).then((result) => {
      if (result.isConfirmed) {
        Logout()
          .then(() => {
            Swal.fire({
              title: 'Logged Out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              background: theme === 'dark' ? '#0A0F14' : '#FFFFFF',
              color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
              background: theme === 'dark' ? '#0A0F14' : '#FFFFFF',
              color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
            });
          });
      }
    });
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handletheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const allLinks = (
    <>
      <NavLink to="/" className="hover:text-[var(--primary)] transition-colors duration-200 font-semibold tracking-wide">
        Home
      </NavLink>
      <NavLink to="/allVehicles" className="hover:text-[var(--primary)] transition-colors duration-200 font-semibold tracking-wide">
        All Vehicles
      </NavLink>
      <NavLink to="/about" className="hover:text-[var(--primary)] transition-colors duration-200 font-semibold tracking-wide">
        About Us
      </NavLink>
      <NavLink to="/contact" className="hover:text-[var(--primary)] transition-colors duration-200 font-semibold tracking-wide">
        Contact
      </NavLink>
      {users && (
        <NavLink to="/dashboard/home" className="hover:text-[var(--primary)] transition-colors duration-200 font-semibold tracking-wide">
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbars sticky top-0 z-50">
      <div className="navbar container mx-auto md:px-4 py-3">
        <div className="navbar-start items-center">
          <div className="dropdown mr-0 lg:hidden">
            <div tabIndex={0} className="btn btn-ghost text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[var(--bg-main)] rounded-none mt-3 w-64 p-6 shadow-2xl border border-[var(--primary)]/20 space-y-4 uppercase tracking-widest">
              {allLinks}
            </ul>
          </div>

          <Link to="/" className="group flex items-center gap-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r from-[#D4AF37] via-[#F2CC8F] to-[#C5A059] bg-clip-text text-transparent ml-1 flex justify-center ">
               T<span className="md:flex hidden mr-1">RAVEL</span> E<span className="md:flex hidden">ASE</span>
             
            </h2>
          </Link>

       
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-8 uppercase text-xs tracking-[0.2em]">
            {allLinks}
          </ul>
        </div>

        <div className="navbar-end gap-6">
         
             {/* Theme Toggle  */}
          <label className="swap swap-rotate text-[var(--primary)] hover:scale-110 transition-transform">
          <input 
            type="checkbox" 
            onChange={(e) => handletheme(e.target.checked)} 
            checked={theme === "dark"}
          />
          <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

          {users ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-[var(--primary)] p-0.5">
                <div className="w-10 rounded-full">
                  <img src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"} alt="profile" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-[var(--card-bg)] rounded-none w-64 border border-[var(--primary)]/20 backdrop-blur-xl">
                <li className="px-4 py-4 border-b border-white/5 mb-2">
                  <p className="font-bold text-[var(--primary)] truncate tracking-wide uppercase text-sm">{users?.displayName}</p>
                  <p className="text-[10px] opacity-50 truncate">{users?.email}</p>
                </li>
                <li><Link to="/dashboard/home" className="py-3 flex gap-3 items-center hover:text-[var(--primary)]"><FaThLarge /> Dashboard</Link></li>
                <li><Link to="/dashboard/profile" className="py-3 flex gap-3 items-center hover:text-[var(--primary)]"><FaUserCircle /> My Profile</Link></li>
                <li><button onClick={handleLogout} className="py-3 flex gap-3 items-center text-red-500 font-bold hover:bg-red-500/5"><FaSignOutAlt /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)] transition-all">
                Login
              </Link>
              <Link to="/register">
                <button className="btn-gradient text-[10px]">Get Started</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;