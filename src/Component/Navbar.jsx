import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
      <div className="navbar-end flex items-center space-x-3">
        <Link to="/login">
          <button className="bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-white font-semibold py-2 px-5 rounded-full shadow-md hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-[#81B29A] text-[#3D405B] font-medium py-2 px-5 rounded-full hover:bg-[#E07A5F] hover:text-white transition duration-300">
            Register
          </button>
        </Link>
      </div>

    </div>
   </div>
  );
};

export default Navbar;
