// VehicleCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-[#1E293B] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
    
      <img
        src={vehicle.coverImage}
        alt={vehicle.vehicleName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">{vehicle.vehicleName}</h2>
          <p className="text-gray-300 mb-1">{vehicle.category}</p>
          <p className="text-gray-400 mb-1">Location: {vehicle.location}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[#7C3AED] font-semibold">${vehicle.pricePerDay}/day</span>
          <Link
            to={`/vehicle/${vehicle._id}`}
            className="flex items-center gap-2 bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-white py-1 px-3 rounded-lg hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300"
          >
            View Details <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
