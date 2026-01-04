import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
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
            text: 'You have been successfully logged out.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
            color: theme === 'dark' ? '#F4F1DE' : '#3D405B',
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
            background: theme === 'dark' ? '#1E293B' : '#FFFFFF',
            color: theme === 'dark' ? '#F4F1DE' : '#3D405B',
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
      <NavLink
        to="/"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        Home
      </NavLink>
      <NavLink
        to="/allVehicles"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        All Vehicles
      </NavLink>
      <NavLink
        to="/about"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        Contact
      </NavLink>
     {users && <NavLink to="/dashboard/home" className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold">
          Dashboard
        </NavLink>}
      <label className="toggle text-base-content  ">
        <input
          onChange={(e) => handletheme(e.target.checked)}
          type="checkbox"
          value="synthwave"
          checked={theme === "dark"}
          className="theme-controller"
        />

        <svg
          aria-label="sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
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

        <svg
          aria-label="moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      </label>
    </>
  );

  return (
    <div className=" navbars dark:bg-[#0F172A] bg-[#F4F1DE] sticky top-0 z-50 ">
      <div className="navbar  container mx-auto md:px-4 py-3 ">
        <div className="navbar-start  items-center">
          <div className="dropdown mr-0 lg:hidden">
            <div tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#F4F1DE] rounded-xl mt-3 w-52 p-2 shadow"
            >
              {allLinks}
            </ul>
          </div>
          <h2>
            <Link to="/" className="text-2xl font-bold hidden md:flex">
              <span className="text-[#E07A5F]">Travel</span>
              <span className="text-[#F2CC8F]">Ease</span>
            </Link>
          </h2>
          <Link to="/" className="text-2xl font-bold md:hidden flex">
            <span className="text-[#E07A5F]">T</span>
            <span className="text-[#F2CC8F]">E</span>
          </Link>
          <div className="flex lg:hidden ml-4">
            <label className="toggle text-base-content  ">
              <input
                onChange={(e) => handletheme(e.target.checked)}
                type="checkbox"
                value="synthwave"
                checked={theme === "dark"}
                className="theme-controller"
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
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

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex  ">
          <ul className="menu  menu-horizontal px-1 space-x-6">{allLinks}</ul>
        </div>

        <div className="navbar-end">
          {users ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-[#E07A5F]">
                <div className="w-10 rounded-full">
                  <img src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"} alt="profile" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-[#1E293B] rounded-2xl w-56 border border-gray-100 dark:border-gray-800">
                <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                  <p className="font-bold text-[#3D405B] dark:text-white truncate">{users?.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{users?.email}</p>
                </li>
                <li><Link to="/dashboard/home" className="py-3 flex gap-3 items-center"><FaThLarge className="text-[#E07A5F]" /> Dashboard</Link></li>
                <li><Link to="/dashboard/profile" className="py-3 flex gap-3 items-center"><FaUserCircle className="text-[#E07A5F]" /> My Profile</Link></li>
                <li><button onClick={handleLogout} className="py-3 flex gap-3 items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"><FaSignOutAlt /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="btn-gradient">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn-gradient ">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
