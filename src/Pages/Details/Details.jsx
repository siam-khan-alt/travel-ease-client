import React from "react";

import { FaMapMarkerAlt, FaDollarSign, FaCar, FaCalendarAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const vehicle = useLoaderData();
  
  
  if (!vehicle) {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8">
      <div className="max-w-5xl mx-auto bg-[#1E293B] shadow-2xl rounded-xl p-6 md:p-10">
      
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={vehicle?.coverImage}
            alt=""
            className="w-full md:w-1/2 rounded-lg object-cover h-[300px] md:h-[400px]"
          />
          <div className="flex-1 text-white">
            <h2 className="text-4xl font-bold mb-4">{vehicle.vehicleName}</h2>
            <p className="mb-4 text-gray-300">{vehicle?.description}</p>

            <div className="flex flex-col gap-3 mb-4">
              <p className="flex items-center gap-2">
                <FaCar /> <span>Category: {vehicle?.category}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaDollarSign /> <span>Price/Day: ${vehicle?.pricePerDay}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> <span>Location: {vehicle?.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> <span>Status: {vehicle?.availability}</span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Owner</h3>
              <p>{vehicle?.owner}</p>
              <p className="text-gray-400">{vehicle?.userEmail}</p>
            </div>
            <button className="btn w-full md:w-auto bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:from-[#D35D42] hover:to-[#E4B462] text-white rounded-full py-2 px-6 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
