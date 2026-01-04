
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMap } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";


const VehicleCard = ({ vehicle }) => {
  

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0F172A] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
    
      <img
        src={vehicle.coverImage}
        alt={vehicle.vehicleName}
        className="w-full h-36 object-cover"
      />

      <div className="p-4 flex flex-col justify-between ">
        <div>
          <h2 className="text-[18px] font-bold text-[#3D405B] dark:text-white mb-1 line-clamp-1 flex-1">{vehicle.vehicleName}</h2>
          <p className="text-[#9CA3AF] dark:text-gray-400 mb-1 flex items-center gap-1 "><FaMapLocation/> <span className="line-clamp-1 flex-1">{vehicle.location}</span></p>
        </div>

        
          <p className="text-[#7C3AED] my-2 font-semibold">${vehicle.pricePerDay}/day</p>
          
        
        <button>
          <Link
            to={`/details/${vehicle._id}`}
            className="flex items-center justify-center  gap-2 btn-gradient"
          >
            View Details <FaArrowRight />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
