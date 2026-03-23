import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaReceipt, FaClock, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";

const MyBookings = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${users?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:!text-left uppercase tracking-tighter text-gradient-gold">Deployment History</h1>
        <p className="text-[var(--text-main)]/40 text-xs text-center md:text-left font-bold tracking-[0.3em] uppercase mt-1">
          Manage your active and past vehicle assignments
        </p>
      </div>

      {/* Bookings Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {bookings.length > 0 ? (
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em]">
                  <th className="py-5 px-6 font-black">#</th>
                  <th className="py-5 px-6 font-black text-left">Vehicle Details</th>
                  <th className="py-5 px-6 font-black text-left">Schedule</th>
                  <th className="py-5 px-6 font-black text-left">Price</th>
                  <th className="py-5 px-6 font-black text-center">Security Status</th>
                  <th className="py-5 px-6 font-black text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--primary)]/5">
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-[var(--primary)]/5 transition-all duration-300">
                    <td className="px-6 py-5 font-mono text-xs opacity-30">{index + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 overflow-hidden">
                            <img src={booking.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-[var(--text-main)] uppercase tracking-wide">{booking.vehicleName}</p>
                          <p className="text-[10px] opacity-40 font-mono italic">ID: {booking.vehicleId?.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-[var(--text-main)]/70">{new Date(booking.date).toLocaleDateString()}</span>
                        <span className="text-[10px] opacity-40 uppercase tracking-tighter flex items-center gap-1">
                          <FaClock size={8} /> {booking.location || "Central Port"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-[var(--primary)]">${booking.price}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === 'Paid' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {booking.status === 'Paid' ? <FaCheckCircle /> : <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"/>}
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       {booking.transactionId ? (
                         <div className="group relative">
                            <button className="p-2 bg-[var(--primary)]/5 text-[var(--primary)] rounded-md hover:bg-[var(--primary)] hover:text-black transition-all">
                                <FaReceipt />
                            </button>
                            {/* Hover Tooltip for Transaction ID */}
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[var(--card-bg)] border border-[var(--primary)] text-[var(--primary)] text-[8px] font-mono px-2 py-1 rounded-sm">
                                {booking.transactionId}
                            </span>
                         </div>
                       ) : (
                         <span className="text-[9px] opacity-20 uppercase">No Data</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center space-y-4">
               <div className="w-16 h-16 border-2 border-dashed border-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto opacity-20">
                  <FaReceipt size={24}/>
               </div>
               <p className="text-[var(--text-main)]/30 uppercase text-xs font-bold tracking-[0.5em]">No Deployments Assigned</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;