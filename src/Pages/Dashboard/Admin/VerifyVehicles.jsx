import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaCheck, FaTimes, FaEye, FaCarSide, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const VerifyVehicles = () => {
    const axiosSecure = useAxios();
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const { data: pendingVehicles = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-vehicles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vehicles/pending');
            return res.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.patch(`/vehicles/approve/${id}`);
        },
        onSuccess: () => {
            refetch();
            Swal.fire("Verified!", "Vehicle is now live on the platform.", "success");
            setSelectedVehicle(null);
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/vehicles/admin-delete/${id}`);
        },
        onSuccess: () => {
            refetch();
            Swal.fire("Rejected", "Vehicle submission has been removed.", "error");
            setSelectedVehicle(null);
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold flex items-center gap-3">
                    <FaShieldAlt className="text-[var(--primary)]" /> Safety Verification
                </h1>
                <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">
                    Pending Fleet Audit & Quality Control
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingVehicles.map(vehicle => (
                    <div key={vehicle._id} className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-sm hover:border-[var(--primary)]/40 transition-all group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={vehicle.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[var(--primary)] uppercase tracking-widest border border-[var(--primary)]/20">
                                Pending Review
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-black uppercase tracking-tighter text-lg">{vehicle.vehicleName}</h3>
                            <p className="text-xs opacity-40 mb-4 uppercase font-bold tracking-widest">{vehicle.brand} • {vehicle.categories}</p>
                            
                            <div className="flex items-center justify-between mt-6">
                                <button 
                                    onClick={() => setSelectedVehicle(vehicle)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] hover:underline"
                                >
                                    <FaEye /> View Details
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => approveMutation.mutate(vehicle._id)} className="p-2 bg-green-500/10 text-green-500 rounded-lg border border-green-500/20 hover:bg-green-500 hover:text-white transition-all">
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => rejectMutation.mutate(vehicle._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {pendingVehicles.length === 0 && (
                <div className="text-center py-20 bg-[var(--card-bg)] rounded-2xl border border-dashed border-white/5 opacity-30">
                    <FaCarSide size={50} className="mx-auto mb-4" />
                    <p className="uppercase font-black tracking-[0.3em] text-sm">Clear Skies: No Pending Reviews</p>
                </div>
            )}

            {/* Verification Modal */}
            {selectedVehicle && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[var(--card-bg)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--primary)]/20 shadow-md relative animate-scale-up">
                        <button onClick={() => setSelectedVehicle(null)} className="absolute top-6 right-6 text-2xl opacity-30 hover:opacity-100"><FaTimes /></button>
                        
                        <div className="p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <img src={selectedVehicle.coverImage} className="w-full rounded-xl border border-white/5" alt="" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <img src={selectedVehicle.additionalImg1} className="w-full h-32 object-cover rounded-xl border border-white/5" alt="" />
                                        <img src={selectedVehicle.additionalImg2} className="w-full h-32 object-cover rounded-xl border border-white/5" alt="" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">Host Email: {selectedVehicle.userEmail}</span>
                                        <h2 className="text-4xl font-black uppercase tracking-tighter text-gradient-gold leading-none mt-2">{selectedVehicle.vehicleName}</h2>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
                                        <div>
                                            <p className="text-[10px] uppercase opacity-40 font-bold mb-1">Daily Rate</p>
                                            <p className="text-xl font-black text-[var(--primary)]">${selectedVehicle.pricePerDay}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase opacity-40 font-bold mb-1">Seats</p>
                                            <p className="text-xl font-black">{selectedVehicle.sets} Persons</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase opacity-40 font-bold mb-3">Core Features</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedVehicle.features.map((f, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold">{f}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-10 flex gap-4">
                                        <button onClick={() => approveMutation.mutate(selectedVehicle._id)} className="flex-1 btn-gradient py-4 rounded-xl flex items-center justify-center gap-2">
                                            <FaCheck /> APPROVE ASSET
                                        </button>
                                        <button onClick={() => rejectMutation.mutate(selectedVehicle._id)} className="px-8 bg-red-600/10 text-red-600 border border-red-600/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all">
                                            REJECT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyVehicles;