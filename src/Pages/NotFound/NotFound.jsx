
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-[10rem] font-bold text-orange-400 dark:text-orange-300">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
    </>
  );
};

export default NotFound;
