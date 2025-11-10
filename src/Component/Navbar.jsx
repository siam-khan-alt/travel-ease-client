import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
 const { users, Logout } = use(AuthContext);
 const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 

  const handleLogout = () => {
    Logout()
      .then(() => {
        toast.success("Successfully logged out!");
      })
      .catch((err) => {
        console.log(err.message);
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
        to="/addVehicle"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        Add Vehicle
      </NavLink>
      <NavLink
        to="/myVehicles"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        My Vehicles
      </NavLink>
      <NavLink
        to="/myBookings"
        className="text-[#3D405B] hover:text-[#E07A5F] transition-colors duration-200 font-semibold"
      >
        My Bookings
      </NavLink>
    </>
  );

  return (
   <div className="bg-[#F4F1DE] shadow-md rounded-xl">
     <div className="navbar container mx-auto px-4 py-3 ">
      <div className="navbar-start flex items-center">
        <div className="dropdown lg:hidden">
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
        <Link to="/" className="text-2xl font-bold">
          <span className="text-[#E07A5F]">Travel</span>
          <span className="text-[#F2CC8F]">Ease</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{allLinks}</ul>
      </div>
     <div className="navbar-end">
      <label onChange={(e)=>handletheme(e.target.checked)} className="toggle text-base-content mr-3">
  <input type="checkbox" value="synthwave" className="theme-controller" />

  <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

  <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

</label>
  {users ? (<div className="flex justify-center items-center gap-4">
    <div className="relative group">
      <img
        src={users.photoURL || "https://via.placeholder.com/40"}
        alt=""
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#7C3AED]"
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E293B] text-white px-3 py-1 rounded shadow-md whitespace-nowrap">
        {users.displayName || "User"}
      </div>
    </div>
     <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300 shadow-md"
        >
          Logout
        </button>
        </div>
  ) : (
    <div className="flex gap-2">
      <Link to="/login">
        <button className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300 shadow-md">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300 shadow-md">
          Register
        </button>
      </Link>
    </div>
  )}
</div>

    </div>
   </div>
  );
};

export default Navbar;
