import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaGasPump, FaUsers, FaCogs, FaArrowRight } from "react-icons/fa";

const VehicleCard = ({ vehicle, isReverse }) => {
  return (
    <div className={`group bg-[var(--card-bg)] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-500 hover:border-[var(--primary)]/30 
      ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} w-full md:h-[380px]`}>
      
      <div className="relative w-full md:w-[40%] overflow-hidden shrink-0 h-64 md:h-full">
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[var(--bg-main)]/80 backdrop-blur-md px-3 py-1 rounded-xl border border-[var(--primary)]/20 flex items-center gap-2">
          <FaStar className="text-[var(--primary)] text-xs" />
          <span className="text-[var(--text-main)] font-bold text-xs">{vehicle.ratings}</span>
        </div>
      </div>

      <div className="p-6 md:p-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col xl:flex-row justify-between items-start gap-2 mb-6">
          <div>
            <span className="text-[var(--primary)] font-bold uppercase tracking-[0.3em] text-[9px]">
              {vehicle.categories}
            </span>
            <h3 className="text-xl md:text-2xl text-gradient-gold">
              {vehicle.vehicleName}
            </h3>
          </div>
          <div className="bg-[var(--primary)]/5 px-4 py-2 rounded-xl border border-[var(--primary)]/10 shrink-0">
            <p className="text-xl text-gradient-gold">${vehicle.pricePerDay}</p>
            <p className="text-[8px] uppercase font-bold opacity-50 tracking-tighter">Day Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-[var(--primary)]/10">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase opacity-40 font-bold mb-1">Seats</span>
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-main)]"><FaUsers className="text-[var(--primary)]"/> {vehicle.seats}</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase opacity-40 font-bold mb-1">Transmission</span>
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-main)]"><FaCogs className="text-[var(--primary)]"/> Auto</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase opacity-40 font-bold mb-1">Fuel</span>
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-main)]"><FaGasPump className="text-[var(--primary)]"/> Petrol</div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase opacity-40 font-bold mb-1">Type</span>
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-main)]"><FaStar className="text-[var(--primary)]"/> Premium</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={`/details/${vehicle._id}`} className="flex-1 btn-gradient !py-3 !rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] italic">
            Book Now <FaArrowRight />
          </Link>
          <Link to={`/details/${vehicle._id}`} className="px-6 py-3 rounded-xl border border-[var(--primary)]/20 font-bold text-[10px] text-[var(--text-main)] uppercase tracking-widest hover:bg-[var(--primary)]/10 transition-all text-center">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;