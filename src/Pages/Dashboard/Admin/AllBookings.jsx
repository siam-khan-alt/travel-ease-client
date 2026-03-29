import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import {
  FaExchangeAlt,
  FaHistory,
  FaCalendarCheck,
  FaEye,
  FaTimes,
  FaFingerprint,
  FaUserTie,
  FaCarSide,
  FaClock,
} from "react-icons/fa";
import { format } from "date-fns";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const AllBookings = () => {
  const axiosSecure = useAxios();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: allBookings = [], isLoading } = useQuery({
    queryKey: ["admin-all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-bookings");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 animate-fade-in pb-10 relative">
      <DashboardHeader
        title="Master Booking Ledger"
        subtitle="Global Transaction Log & Reservation History"
        role="admin"
        Icon={FaExchangeAlt}
        statusText={`Total: ${allBookings.length} Bookings`}
      />

      <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em] border-b border-[var(--primary)]/10">
              <tr>
                <th className="py-6 pl-8">Asset & Schedule</th>
                <th>Client Details</th>
                <th>Status & Revenue</th>
                <th className="text-right pr-8">Action</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-main)]">
              {allBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-white/5 hover:bg-[var(--primary)]/5 transition-all group"
                >
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-lg overflow-hidden border border-white/5">
                        <img
                          src={booking.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-wider text-xs">
                          {booking.vehicleName}
                        </div>
                        <div className="text-[9px] opacity-40 font-mono mt-1">
                          {booking.requestDate?.$date
                            ? format(
                                new Date(booking.requestDate.$date),
                                "dd MMM yyyy"
                              )
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-xs font-bold uppercase tracking-tighter">
                      {booking.userName}
                    </div>
                    <div className="text-[9px] opacity-30 font-mono">
                      {booking.userEmail}
                    </div>
                  </td>
                  <td>
                    <div className="text-[9px] font-black uppercase mb-1 text-green-500">
                      {booking.status}
                    </div>
                    <div className="text-sm font-black text-gradient-gold">
                      ${booking.totalPrice || booking.price}
                    </div>
                  </td>
                  <td className="text-right pr-8">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-3 text-[var(--primary)]/40 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-xl transition-all"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[var(--card-bg)] border border-[var(--primary)]/20 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
            <div className="bg-[var(--primary)]/10 p-6 flex justify-between items-center border-b border-[var(--primary)]/10">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-gradient-gold">
                  Verification Record
                </h2>
                <p className="text-[9px] opacity-60 font-bold uppercase tracking-[0.3em]">
                  Full System Audit Logs
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-white/5 rounded-full text-[var(--primary)]"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-30 flex items-center gap-2">
                    <FaCarSide /> Asset Information
                  </p>
                  <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-white/5">
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {selectedBooking.vehicleName}
                    </p>
                    <p className="text-[9px] opacity-50 mt-1 font-mono">
                      ID: {selectedBooking.vehicleId}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-30 flex items-center gap-2">
                    <FaUserTie /> Stakeholders
                  </p>
                  <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-white/5 space-y-3">
                    <div>
                      <p className="text-[9px] uppercase font-bold opacity-40">
                        Client
                      </p>
                      <p className="text-[11px] font-bold">
                        {selectedBooking.userName}
                      </p>
                      <p className="text-[10px] font-mono opacity-60">
                        {selectedBooking.userEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold opacity-40">
                        Provider Access
                      </p>
                      <p className="text-[10px] font-mono text-[var(--primary)]">
                        {selectedBooking.hostEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-30 flex items-center gap-2">
                    <FaClock /> Schedule Details
                  </p>
                  <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] uppercase font-bold opacity-40">
                        Start Date
                      </p>
                      <p className="text-[10px] font-bold">
                        {selectedBooking.startDate?.$date
                          ? format(
                              new Date(selectedBooking.startDate.$date),
                              "dd MMM yyyy"
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold opacity-40">
                        End Date
                      </p>
                      <p className="text-[10px] font-bold">
                        {selectedBooking.endDate?.$date
                          ? format(
                              new Date(selectedBooking.endDate.$date),
                              "dd MMM yyyy"
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/5 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                        {selectedBooking.totalDays} Rental Days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-30 flex items-center gap-2">
                    <FaFingerprint /> Security & Finance
                  </p>
                  <div className="bg-[var(--bg-main)] p-4 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold opacity-40">
                        Trx ID
                      </span>
                      <span className="text-[9px] font-mono text-[var(--primary)] truncate ml-4">
                        {selectedBooking.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold opacity-40">
                        Base Price
                      </span>
                      <span className="text-[10px] font-bold">
                        ${selectedBooking.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Total Settled
                      </span>
                      <span className="text-lg font-black text-gradient-gold">
                        ${selectedBooking.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[var(--bg-main)] flex gap-4">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-4 bg-[var(--primary)] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:opacity-90 transition-all"
              >
                Close Official Record
              </button>
            </div>
          </div>
        </div>
      )}

      {allBookings.length === 0 && (
        <div className="text-center py-20 opacity-20">
          <FaCalendarCheck size={50} className="mx-auto mb-4" />
          <p className="uppercase font-black tracking-widest text-sm">
            No reservations found in system memory
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
