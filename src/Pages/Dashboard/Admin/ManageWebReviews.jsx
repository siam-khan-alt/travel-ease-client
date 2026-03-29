import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaCommentDots, FaTrash, FaStar, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardHeader from '../../../Component/Dashboard/Common/DashboardHeader';

const ManageWebReviews = () => {
    const axiosSecure = useAxios();
    
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-web-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/web-reviews');
            return res.data;
        }
    });

    const { mutate: handleUpdateStatus } = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/web-reviews/${id}`, { status });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Approved!",
                    text: "Review is now live.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: 'var(--card-bg)',
                    color: 'var(--text-main)',
                });
                refetch();
            }
        },
        onError: () => {
            Swal.fire("Error", "Failed to update status", "error");
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            background: 'var(--card-bg)',
            color: 'var(--text-main)',
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/web-reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Review removed.", "success");
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 animate-fade-in pb-10">
          <DashboardHeader 
                title="User Experiences" 
                subtitle="Manage and curate website testimonials"
                role="admin"
                Icon={FaCommentDots}
                statusText={`Total: ${reviews.length} Feedbacks`}
            />

            {/* Reviews Table Container */}
            <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em] border-b border-[var(--primary)]/10">
                            <tr>
                                <th className="py-6 pl-8">User Profile</th>
                                <th>Testimonial</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[var(--text-main)]">
                            {reviews.map((rev) => (
                                <tr key={rev._id} className="border-b border-white/5 hover:bg-[var(--primary)]/5 transition-all group">
                                    {/* User Column */}
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full overflow-hidden border border-[var(--primary)]/20 shadow-inner">
                                                <img src={rev.img} className="w-full h-full object-cover" alt={rev.name} />
                                            </div>
                                            <div>
                                                <div className="font-bold uppercase tracking-wider text-xs">{rev.name}</div>
                                                <div className="text-[9px] opacity-40 font-mono mt-0.5">{rev.role || 'Verified User'}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Review Text Column */}
                                    <td className="max-w-xs">
                                        <div className="flex gap-2">
                                            <FaQuoteLeft className="text-[var(--primary)]/20 flex-shrink-0 mt-1" size={10} />
                                            <p className="text-xs italic opacity-70 leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                                                {rev.text}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Rating Column */}
                                    <td>
                                        <div className="flex gap-0.5 text-[var(--primary)]">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} size={10} className={i < rev.rating ? "fill-current" : "opacity-20"} />
                                            ))}
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            rev.status === 'approved' 
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        }`}>
                                            {rev.status}
                                        </span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="text-right pr-8">
                                        <div className="flex justify-end gap-2">
                                            {rev.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleUpdateStatus({ id: rev._id, status: 'approved' })} 
                                                    className="p-3 text-green-700 hover:text-green-500 hover:bg-green-500/10 rounded-xl transition-all"
                                                    title="Approve Review"
                                                >
                                                    <FaCheckCircle size={16} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(rev._id)} 
                                                className="p-3 text-red-700/80 hover:text-red-600 hover:bg-red-600/10 rounded-xl transition-all"
                                                title="Delete Review"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {reviews.length === 0 && (
                    <div className="text-center py-20 opacity-20">
                        <FaCommentDots size={50} className="mx-auto mb-4" />
                        <p className="uppercase font-black tracking-widest text-sm">No reviews found in database</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageWebReviews;