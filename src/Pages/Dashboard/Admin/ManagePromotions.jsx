import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import {  FaCheck, FaTrashAlt, FaImage, FaAd } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardHeader from '../../../Component/Dashboard/Common/DashboardHeader';

const ManagePromotions = () => {
    const axiosSecure = useAxios();

    const { data: promotions = [], isLoading, refetch } = useQuery({
        queryKey: ['all-promotions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/promotions');
            return res.data;
        }
    });

    const handleApprove = async (promo) => {
        Swal.fire({
            title: "Approve Promotion?",
            text: `This will feature '${promo.vehicleName}' on the main banner.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10B981",
            background: "var(--card-bg)",
            color: "var(--text-main)"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/admin/approve-promo/${promo._id}`);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire("Approved!", "The promotion is now live.", "success");
                }
            }
        });
    };

    const handleReject = async (promo) => {
        Swal.fire({
            title: "Reject & Delete?",
            text: "This will remove the request and notify the host.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            background: "var(--card-bg)",
            color: "var(--text-main)"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/reject-promo/${promo._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Rejected", "The request has been removed.", "success");
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full space-y-8 animate-fade-in pb-10">
            <DashboardHeader 
                title="Promotion Control" 
                subtitle="Manage Featured Banner Requests and Visibility"
                role="admin"
                Icon={FaAd}
                statusText="Ad Campaign Protocol Active"
            />

            <div className="w-full bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-widest">
                            <tr>
                                <th className="py-5 pl-8 text-left">Vehicle Info</th>
                                <th className="text-left">Price Details</th>
                                <th className="text-left">Status</th>
                                <th className="text-right pr-8">Decision</th>
                            </tr>
                        </thead>
                        <tbody className="text-[var(--text-main)]">
                            {promotions.map((promo) => (
                                <tr key={promo._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="relative group">
                                                <img 
                                                    src={promo.bannerImage} 
                                                    className="w-14 h-14 rounded-xl object-cover border border-[var(--primary)]/20 shadow-sm" 
                                                    alt="banner"
                                                />
                                                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                                    <FaImage className="text-white text-xs" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-xs uppercase tracking-tight">{promo.vehicleName}</div>
                                                <div className="text-[10px] opacity-40 font-bold">{promo.hostEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-[var(--primary)]">${promo.discountPrice}</span>
                                            <span className="text-[10px] opacity-30 line-through font-bold">${promo.originalPrice}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                                            promo.status === 'approved' 
                                            ? 'bg-green-500/10 text-green-500' 
                                            : 'bg-orange-500/10 text-orange-500'
                                        }`}>
                                            {promo.status}
                                        </span>
                                    </td>
                                    <td className="text-right pr-8 space-x-2">
                                        {promo.status !== 'approved' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleApprove(promo)} 
                                                    className="btn btn-xs rounded-lg border-green-500/20 text-green-500 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all"
                                                >
                                                    <FaCheck className="mr-1" /> Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(promo)} 
                                                    className="btn btn-xs rounded-lg border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                                >
                                                    <FaTrashAlt className="mr-1" /> Reject
                                                </button>
                                            </>
                                        ) : (
                                            <button 
                                                onClick={() => handleReject(promo)} 
                                                className="btn btn-xs rounded-lg border-white/10 text-white/40 hover:bg-red-500 hover:text-white transition-all"
                                                title="Remove active promotion"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {promotions.length === 0 && (
                <div className="text-center py-20 bg-[var(--card-bg)] rounded-2xl border border-dashed border-white/10 opacity-30">
                    <p className="text-sm font-bold uppercase tracking-widest">No promotion requests found</p>
                </div>
            )}
        </div>
    );
};

export default ManagePromotions;