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

          {/* Theme Toggle Mobile */}
          <div className="flex lg:hidden ml-4">
             <input
              onChange={(e) => handletheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle border-[var(--primary)] bg-[var(--primary)]"
            />
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-8 uppercase text-xs tracking-[0.2em]">
            {allLinks}
          </ul>
        </div>

        <div className="navbar-end gap-6">
          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex">
             <input
              onChange={(e) => handletheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle border-[var(--primary)] bg-[var(--primary)]"
            />
          </div>

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