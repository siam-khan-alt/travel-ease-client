import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import { FaHeart, FaExternalLinkAlt, FaGem, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["wishlist-items", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist-items/${users?.email}`);
      return res.data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (vehicleId) => {
      return await axiosSecure.patch("/wishlist/toggle", {
        vehicleId,
        userEmail: users?.email,
        action: "remove",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist-items", users?.email]);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Released from Vault',
        showConfirmButton: false,
        timer: 1500,
        background: 'var(--card-bg)',
        color: 'var(--text-main)'
      });
    },
  });

  const handleUnwish = (id) => {
    Swal.fire({
      title: 'Release Asset?',
      text: "Remove this vehicle from your favorites?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#333',
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl md:!text-left font-black uppercase tracking-tighter text-gradient-gold">Secure Vault</h1>
        <p className="text-[var(--text-main)]/40 text-[10px] font-bold tracking-[0.4em] text-center md:text-left uppercase mt-1">
          Reserved Assets & Priority Interest Logs
        </p>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {items.length > 0 ? (
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em]">
                  <th className="py-5 px-6 font-black text-left">Premium Asset</th>
                  <th className="py-5 px-6 font-black text-left">Location</th>
                  <th className="py-5 px-6 font-black text-left">Daily Rate</th>
                  <th className="py-5 px-6 font-black text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--primary)]/5">
                {items.map((vehicle) => (
                  <tr key={vehicle._id} className="hover:bg-[var(--primary)]/5 transition-all duration-300 group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 overflow-hidden">
                          <img 
                            src={vehicle.coverImage} 
                            alt="" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                          />
                        </div>
                        <div>
                           <p className="font-bold text-xs uppercase tracking-wide text-[var(--text-main)]">
                            {vehicle.vehicleName}
                          </p>
                          <span className="text-[8px] font-black text-[var(--primary)]/60 uppercase tracking-widest">{vehicle.categories}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text-main)]/60 font-bold uppercase tracking-tighter">
                        <FaMapMarkerAlt className="text-[var(--primary)] opacity-40" />
                        {vehicle.location}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-black text-[var(--text-main)] text-sm">
                        ${vehicle.pricePerDay}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <Link 
                          to={`/details/${vehicle._id}`}
                          className="p-2 bg-[var(--primary)]/5 text-[var(--primary)] rounded-md hover:bg-[var(--primary)] hover:text-black transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 border border-[var(--primary)]/10"
                        >
                          Details <FaExternalLinkAlt size={10} />
                        </Link>
                        
                        <button 
                          onClick={() => handleUnwish(vehicle._id)}
                          className="group/heart relative p-2 transition-all duration-300 transform hover:scale-110"
                        >
                          {/* Golden Gradient Heart */}
                          <svg width="0" height="0">
                            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop stopColor="#C5A059" offset="0%" />
                              <stop stopColor="#F2CC8F" offset="50%" />
                              <stop stopColor="#D4AF37" offset="100%" />
                            </linearGradient>
                          </svg>
                          <FaHeart size={18} style={{ fill: "url(#gold-gradient)" }} className="opacity-90 group-hover/heart:opacity-100 group-hover/heart:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-24 text-center space-y-5">
                <div className="w-20 h-20 border-2 border-dashed border-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto opacity-10">
                   <FaGem size={32}/>
                </div>
                <div className="space-y-1">
                  <p className="text-[var(--text-main)]/30 uppercase text-xs font-bold tracking-[0.5em]">Vault Is Empty</p>
                  <p className="text-[10px] text-[var(--text-main)]/20 uppercase tracking-widest">No priority assets secured yet</p>
                </div>
                <Link to="/all-vehicles" className="inline-block mt-4 text-[9px] font-black text-[var(--primary)] border border-[var(--primary)]/30 px-6 py-2 rounded-full hover:bg-[var(--primary)] hover:text-black transition-all uppercase tracking-widest">
                  Browse Collection
                </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;