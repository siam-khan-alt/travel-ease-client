import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  FaMapMarkerAlt, FaUsers, FaStar, FaCheckCircle, FaShieldAlt, FaIdCard, 
  FaArrowRight
} from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import Motions from "../../Component/Motions";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Component/shared/LoadingSpinner";

const Details = () => {
  const { id } = useParams();
  const { users } = useContext(AuthContext);
  const instanceAxios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImg, setActiveImg] = useState(null);

  const { data: vehicle, isLoading} = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const res = await instanceAxios.get(`/vehicles/${id}`);
      return res.data;
    }
  });

  const { data: relatedVehicles = [] } = useQuery({
    queryKey: ['related-vehicles', vehicle?.categories, id],
    enabled: !!vehicle?.categories,
    queryFn: async () => {
      const res = await instanceAxios.get(`/related-vehicles?category=${vehicle.categories}&currentId=${id}`);
      return res.data;
    }
  });

  const getSwalStyle = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || true; // তোমার থিম লজিক অনুযায়ী
  return {
    background: isDark ? "#111827" : "#FFFFFF",
    color: isDark ? "#F1F5F9" : "#0F172A",
    confirmButtonColor: "#D4AF37",
    cancelButtonColor: isDark ? "#1E293B" : "#E2E8F0",
  };
};
  const handleBooking = async () => {
    if (!users) {
      Swal.fire({
        title: 'Access Denied',
        text: "Please login to book this premium vehicle!",
        icon: 'warning',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
      }).then(() => navigate("/login", { state: location.pathname }));
      return;
    }
Swal.fire({
    title: 'Initiate Request?',
    text: `Send a rental request for ${vehicle.vehicleName}?`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Send Request',
    ...getSwalStyle() 
  }).then(async (result) => {
    if (result.isConfirmed) {
      const bookingInfo = {
        vehicleId: vehicle._id,
        vehicleName: vehicle.vehicleName,
        price: vehicle.pricePerDay,
        userEmail: users.email,
        userName: users.displayName,
        hostEmail: vehicle.userEmail, 
        category: vehicle.categories,
        image: vehicle.coverImage
      };

      try {
        const res = await instanceAxios.post("/bookings", bookingInfo);
        if (res.data.success) {
          Swal.fire({
            title: 'Request Transmitted!',
            text: "The host has been notified. Check your notifications for approval.",
            icon: 'success',
            ...getSwalStyle()
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Transmission Failed',
          text: err.response?.data?.message || "Something went wrong",
          ...getSwalStyle()
        });
      }
    }
  });
};
  if (isLoading) return <LoadingSpinner />;

  return (
    <Motions className="bg-[var(--bg-main)] min-h-screen py-12 px-4 md:py-20">
      <div className="container mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group overflow-hidden rounded-3xl border border-[var(--primary)]/20 shadow-2xl bg-[var(--card-bg)]">
              <img
                src={activeImg || vehicle.coverImage}
                alt="Main"
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[var(--accent)]/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-[var(--primary)]/30 flex items-center gap-2">
                <FaStar className="text-[var(--primary)]" />
                <span className="text-white font-bold">{vehicle.ratings}</span>
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
              {[vehicle.coverImage, vehicle.additionalImg1, vehicle.additionalImg2].filter(Boolean).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImg(img)}
                  className={`relative min-w-[120px] h-24 rounded-2xl cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                    (activeImg === img || (!activeImg && img === vehicle.coverImage)) ? 'border-[var(--primary)] scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking & Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--card-bg)] rounded-3xl p-8 border border-[var(--primary)]/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
              
              <span className="text-[var(--primary)] font-bold uppercase tracking-[0.4em] text-[10px] mb-2 block">
                {vehicle.categories} Excellence
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gradient-gold uppercase leading-tight mb-4">
                {vehicle.vehicleName}
              </h1>

              <div className="flex items-end gap-2 mb-8 border-b border-[var(--primary)]/10 pb-6">
                <span className="text-4xl font-black text-[var(--text-main)]">${vehicle.pricePerDay}</span>
                <span className="text-[var(--text-main)]/50 font-medium mb-1 uppercase text-xs tracking-widest">/ Per Day</span>
              </div>

              {/* Core Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-[var(--primary)]/5">
                  <p className="text-[9px] uppercase font-bold text-[var(--primary)] opacity-60 mb-1">Capacity</p>
                  <div className="flex items-center gap-2 font-bold text-[var(--text-main)]">
                    <FaUsers className="text-[var(--primary)]" /> {vehicle.seats} Seats
                  </div>
                </div>
                <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-[var(--primary)]/5">
                  <p className="text-[9px] uppercase font-bold text-[var(--primary)] opacity-60 mb-1">Status</p>
                  <div className="flex items-center gap-2 font-bold text-[var(--primary)]">
                    <FaShieldAlt /> {vehicle.availability}
                  </div>
                </div>
                <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-[var(--primary)]/5 col-span-2">
                  <p className="text-[9px] uppercase font-bold text-[var(--primary)] opacity-60 mb-1">Location</p>
                  <div className="flex items-center gap-2 font-bold text-[var(--text-main)]">
                    <FaMapMarkerAlt className="text-[var(--primary)]" /> {vehicle.location}
                  </div>
                </div>
              </div>

              <button onClick={handleBooking} className="btn-gradient w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-[var(--primary)]/10">
                Secure This Vehicle
              </button>
            </div>

            {/* Owner/Security Mini Card */}
            <div className="bg-[var(--accent)] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center text-[var(--primary)] text-xl">
                <FaIdCard />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Managed By</p>
                <p className="text-white font-bold">{vehicle.owner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs & Rules */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-t border-[var(--primary)]/10 pt-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gradient-gold uppercase font-outfit">The Experience</h3>
            <p className="text-[var(--text-main)] opacity-70 leading-relaxed font-poppins text-sm italic">
              "{vehicle.description}"
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gradient-gold uppercase font-outfit">Premium Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {vehicle.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--primary)]/5 hover:border-[var(--primary)]/30 transition-colors">
                  <FaCheckCircle className="text-[var(--primary)]" />
                  <span className="font-bold text-xs uppercase tracking-widest opacity-80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gradient-gold uppercase font-outfit">Rental Etiquette</h3>
            <ul className="space-y-4">
              {vehicle.rules?.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-poppins opacity-70">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Vehicles using your VehicleCard Component */}
        {relatedVehicles.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black text-gradient-gold uppercase font-outfit">Similar Collections</h3>
              <div className="h-[1px] flex-1 bg-[var(--primary)]/10 mx-8 hidden md:block"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {relatedVehicles.map((item, index) => (
                 <Motions key={item._id} delay={index * 0.1}>
                    {/* Assuming you want to use the card design you shared earlier */}
                    <div className="group bg-[var(--card-bg)] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm transition-all duration-500 hover:border-[var(--primary)]/30 w-full md:h-[200px]">
                        <img src={item.coverImage} className="w-full md:w-[35%] object-cover" />
                        <div className="p-6 flex flex-col justify-center flex-1">
                          <h4 className="text-lg font-bold text-gradient-gold mb-2">{item.vehicleName}</h4>
                          <p className="text-[var(--primary)] font-bold text-sm mb-4">${item.pricePerDay}/day</p>
                          <button onClick={() => {navigate(`/details/${item._id}`); window.scrollTo(0,0)}} className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)] hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                            View Details <FaArrowRight />
                          </button>
                        </div>
                    </div>
                 </Motions>
               ))}
            </div>
          </div>
        )}
      </div>
    </Motions>
  );
};

export default Details;