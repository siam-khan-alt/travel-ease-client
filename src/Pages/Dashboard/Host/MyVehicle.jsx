import React, {  useContext } from 'react';
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaCar, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { AuthContext } from '../../../Context/AuthContext';

const MyVehicles = () => {
    const axiosSecure = useAxios();
    const { users } = useContext(AuthContext);

    const { data: vehicles = [], refetch, isLoading } = useQuery({
        queryKey: ['my-vehicles', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vehicles/host/${users?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            background: 'var(--card-bg)',
            color: 'var(--text-main)',
            confirmButtonColor: '#d33',
            cancelButtonColor: 'var(--primary)',
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/vehicles/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Vehicle has been removed.",
                        icon: "success",
                        background: 'var(--card-bg)',
                        color: 'var(--text-main)',
                    });
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6 lg:p-10 bg-[var(--bg-main)] min-h-screen">
            <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold !text-center md:!text-left">
                    My Fleet ({vehicles.length})
                </h2>
                <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">
                    Manage and monitor your registered vehicles in the system.
                </p>
            </div>

            {/* Table Container - Styled like ManageBookings */}
            <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    {vehicles.length > 0 ? (
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em]">
                                    <th className="py-5 px-6 font-black text-left">Vehicle Details</th>
                                    <th className="py-5 px-6 font-black text-left">Pricing</th>
                                    <th className="py-5 px-6 font-black text-left">Location</th>
                                    <th className="py-5 px-6 font-black text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--primary)]/5">
                                {vehicles.map((vehicle) => (
                                    <tr key={vehicle._id} className="hover:bg-[var(--primary)]/5 transition-all">
                                        {/* Vehicle Info */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative group">
                                                    <img 
                                                        src={vehicle.coverImage || vehicle.image} 
                                                        alt={vehicle.vehicleName} 
                                                        className="w-14 h-14 rounded-xl object-cover border border-[var(--primary)]/20 group-hover:border-[var(--primary)] transition-all"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 bg-[var(--primary)] text-black p-1 rounded-md text-[8px]">
                                                        <FaCar />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[var(--text-main)] uppercase text-sm tracking-wide">
                                                        {vehicle.vehicleName}
                                                    </p>
                                                    <p className="text-[9px] opacity-40 font-mono uppercase">
                                                        Category: {vehicle.categories || 'Standard'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Pricing */}
                                        <td className="px-6 py-5 text-[var(--text-main)]">
                                            <div className="flex items-center gap-1">
                                                <FaDollarSign className="text-[var(--primary)] text-xs" />
                                                <span className="font-black text-base">{vehicle.pricePerDay}</span>
                                                <span className="text-[10px] opacity-40 uppercase ml-1">/ Day</span>
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 opacity-70">
                                                <FaMapMarkerAlt className="text-[var(--primary)] text-xs" />
                                                <span className="text-xs font-medium">{vehicle.location}</span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center gap-3">
                                                <Link to={`/dashboard/update-vehicle/${vehicle._id}`}>
                                                    <button 
                                                        className="p-2.5 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-xl hover:bg-[var(--primary)] hover:text-black transition-all shadow-lg"
                                                        title="Edit Vehicle"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(vehicle._id)} 
                                                    className="p-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                                    title="Delete Vehicle"
                                                >
                                                    <FaTrashAlt size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-24 text-center space-y-4">
                            <div className="inline-block p-6 rounded-full bg-[var(--primary)]/5 mb-4">
                                <FaCar className="text-4xl text-[var(--primary)]/20" />
                            </div>
                            <p className="text-[var(--text-main)]/30 uppercase text-xs font-bold tracking-[0.5em]">
                                Your Garage is Empty
                            </p>
                            <Link to="/dashboard/add-vehicle" className="btn-gradient !py-2 !text-[10px] inline-block mt-4">
                                Add Your First Vehicle
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyVehicles;