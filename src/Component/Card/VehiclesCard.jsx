import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaGasPump, FaUsers, FaCogs, FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";
import useWishlist from "../../Hooks/useWishlist";

const VehicleCard = ({ vehicle, isReverse }) => {
  const { isWished, toggleWish } = useWishlist(vehicle._id);

  const hasPromo = vehicle.promo && vehicle.promo.status === "approved";
  const finalPrice = hasPromo ? vehicle.promo.discountPrice : vehicle.pricePerDay;
  return (
    <div className={`group bg-[var(--card-bg)] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-500 hover:border-[var(--primary)]/30 
      ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} w-full md:h-[300px]`}>
        <svg width="0" height="0" className="absolute">
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#C5A059" offset="0%" />
          <stop stopColor="#F2CC8F" offset="50%" />
          <stop stopColor="#D4AF37" offset="100%" />
        </linearGradient>
      </svg>
      
      <div className="relative w-full md:w-[40%] overflow-hidden shrink-0 h-64 md:h-full">
        <button 
          onClick={(e) => { e.preventDefault(); toggleWish(); }}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-[var(--bg-main)]/60 backdrop-blur-md border border-[var(--primary)]/20 text-xl transition-all hover:scale-110 active:scale-90 group/heart"
        >
          {isWished ? (
            <FaHeart 
              style={{ fill: "url(#gold-gradient)" }} 
              className="drop-shadow-[0_0_8px_rgba(197,160,89,0.5)] transition-all" 
            />
          ) : (
            <FaRegHeart className="text-[var(--primary)] opacity-70 group-hover/heart:opacity-100 transition-all" />
          )}
        </button>
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[var(--bg-main)]/80 backdrop-blur-md px-3 py-1 rounded-xl border border-[var(--primary)]/20 flex items-center gap-2">
          <FaStar className="text-[var(--primary)] text-xs" />
          <span className="text-[var(--text-main)] font-bold text-xs">{vehicle.ratings > 0 ? vehicle.ratings.toFixed(1) : "New"}</span>
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
          <div className="bg-[var(--primary)]/5 px-4 py-2 rounded-xl border border-[var(--primary)]/10 shrink-0 text-right">
            <div className="flex items-center gap-2 justify-end">
              {hasPromo && (
                <span className="text-[10px] line-through opacity-40 font-bold">${vehicle.pricePerDay}</span>
              )}
              <p className="text-xl text-gradient-gold">${finalPrice}</p>
            </div>
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