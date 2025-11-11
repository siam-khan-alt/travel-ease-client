
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const VehicleCard = ({ vehicle }) => {
  

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
    
      <img
        src={vehicle.coverImage}
        alt={vehicle.vehicleName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h2 className="text-xl font-bold text-[#3D405B] dark:text-white mb-1">{vehicle.vehicleName}</h2>
          <p className="text-[#6B7280] dark:text-gray-300 mb-1">{vehicle.category}</p>
          <p className="text-[#9CA3AF] dark:text-gray-400 mb-1">Location: {vehicle.location}</p>
        </div>

        
          <p className="text-[#7C3AED] my-2 font-semibold">${vehicle.pricePerDay}/day</p>
          
        
        <div>
          <Link
            to={`/details/${vehicle._id}`}
            className="flex items-center justify-center  gap-2 btn-gradient"
          >
            View Details <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
