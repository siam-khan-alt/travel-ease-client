import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaExchangeAlt, FaHistory, FaTrashAlt, FaCalendarCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const AllBookings = () => {
    const axiosSecure = useAxios();

    const { data: allBookings = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-all-bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/all-bookings');
            return res.data;
        }
    });

    const handleDeleteBooking = (id) => {
        Swal.fire({
            title: "Remove Record?",
            text: "This will delete the booking history permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            background: "var(--card-bg)",
            color: "var(--text-main)",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/bookings/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Deleted!", "Booking record removed.", "success");
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold flex items-center gap-3">
                        <FaExchangeAlt className="text-[var(--primary)]" /> Master Booking Ledger
                    </h1>
                    <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">
                        Global Transaction Log & Reservation History
                    </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/5 px-4 py-2 rounded-lg border border-[var(--primary)]/10">
                    <FaHistory /> Total: {allBookings.length} Bookings
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em] border-b border-[var(--primary)]/10">
                            <tr>
                                <th className="py-6 pl-8">Vehicle & Date</th>
                                <th>Client Details</th>
                                <th>Host Access</th>
                                <th>Status & Revenue</th>
                                <th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[var(--text-main)]">
                            {allBookings.map((booking) => (
                                <tr key={booking._id} className="border-b border-white/5 hover:bg-[var(--primary)]/5 transition-all group">
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-16 rounded-lg overflow-hidden border border-white/5">
                                                <img src={booking.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <div className="font-bold uppercase tracking-wider text-xs">{booking.vehicleName}</div>
                                                <div className="text-[9px] opacity-40 font-mono mt-1">
                                                    {booking.requestDate ? format(new Date(booking.requestDate), "dd MMM yyyy | hh:mm a") : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-xs font-bold uppercase tracking-tighter">{booking.userName}</div>
                                        <div className="text-[9px] opacity-30 font-mono">{booking.userEmail}</div>
                                    </td>
                                    <td>
                                        <div className="text-[10px] opacity-40 uppercase font-black tracking-widest">Provider</div>
                                        <div className="text-[9px] font-bold text-[var(--primary)]">{booking.hostEmail}</div>
                                    </td>
                                    <td>
                                        <div className={`text-[9px] font-black uppercase mb-1 ${
                                            booking.status === 'Accepted' ? 'text-green-500' : 
                                            booking.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                                        }`}>
                                            {booking.status}
                                        </div>
                                        <div className="text-sm font-black text-gradient-gold">${booking.price}</div>
                                    </td>
                                    <td className="text-right pr-8">
                                        <button 
                                            onClick={() => handleDeleteBooking(booking._id)}
                                            className="p-3 text-red-700/20 hover:text-red-600 hover:bg-red-600/10 rounded-xl transition-all"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {allBookings.length === 0 && (
                    <div className="text-center py-20 opacity-20">
                        <FaCalendarCheck size={50} className="mx-auto mb-4" />
                        <p className="uppercase font-black tracking-widest text-sm">No reservations found in system memory</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBookings;