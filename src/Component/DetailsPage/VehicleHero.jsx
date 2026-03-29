import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaAward,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";

const VehicleHero = ({ vehicle, users, instanceAxios }) => {
  const [activeImg, setActiveImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hasPromo = vehicle.promo && vehicle.promo.status === "approved";
  const finalPrice = hasPromo
    ? vehicle.promo.discountPrice
    : vehicle.pricePerDay;

  const handleBooking = () => {
    if (!users) {
      return Swal.fire({
        title: "Login Required",
        text: "Please login to reserve this vehicle.",
        icon: "warning",
        background: "var(--card-bg)",
        color: "var(--text-main)",
        confirmButtonColor: "var(--primary)",
      }).then(() => navigate("/login", { state: location.pathname }));
    }
    setIsModalOpen(true);
  };
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-md border border-[var(--primary)]/10 overflow-hidden mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 md:p-10">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/5">
            <img
              src={activeImg || vehicle.coverImage}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="bg-[var(--primary)] px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <FaStar className="text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-black text-xs">
                  {vehicle.ratings > 0 ? vehicle.ratings.toFixed(1) : "New"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 overflow-x-auto">
            {[
              vehicle.coverImage,
              vehicle.additionalImg1,
              vehicle.additionalImg2,
            ]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setActiveImg(img)}
                  className={`w-24 h-16 rounded-xl cursor-pointer object-cover border-2 transition-all ${
                    activeImg === img
                      ? "border-[var(--primary)]"
                      : "border-transparent opacity-50"
                  }`}
                />
              ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-8 md:p-12 border-l border-[var(--primary)]/5 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold uppercase tracking-widest text-[10px] mb-3">
            <FaCrown /> Premium Asset
          </div>
          <h1 className="text-4xl font-black text-gradient-gold uppercase mb-4">
            {vehicle.vehicleName}
          </h1>
          <p className="flex items-center gap-2 text-sm opacity-60 mb-8">
            <FaMapMarkerAlt /> {vehicle.location}
          </p>

          <div className="flex justify-between py-6 border-y border-[var(--primary)]/10 mb-8">
            <div>
              <p className="text-[10px] opacity-40 uppercase font-bold">
                Daily Rate
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-[var(--text-main)]">
                  ${finalPrice}
                </span>
                {hasPromo && (
                  <span className="text-lg text-[var(--text-main)]/30 line-through font-bold">
                    ${vehicle.pricePerDay}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-40 uppercase font-bold">
                Bookings
              </p>
              <span className="text-xl font-bold">
                {vehicle.bookingCount || 0}+
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="btn-gradient w-full py-5 rounded-2xl font-black uppercase tracking-widest"
          >
            Select Date & Reserve <FaArrowRight className="inline ml-2" />
          </button>
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            vehicle={vehicle}
            users={users}
            instanceAxios={instanceAxios}
            finalPrice={finalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleHero;
