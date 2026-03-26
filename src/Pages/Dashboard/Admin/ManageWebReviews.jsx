import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaCommentDots, FaTrash, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageWebReviews = () => {
    const axiosSecure = useAxios();
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-web-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/web-reviews');
            return res.data;
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
        <div className="w-full space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold flex items-center gap-3">
                    <FaCommentDots className="text-[var(--primary)]" /> User Experiences
                </h1>
                <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">
                    Manage and curate website testimonials
                </p>
            </header>

            <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-lg">
                <table className="table w-full border-collapse">
                    <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="p-5">User</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-[var(--text-main)]/80">
                        {reviews.map((rev) => (
                            <tr key={rev._id} className="border-b border-[var(--primary)]/5 hover:bg-white/5 transition-all">
                                <td className="p-5 flex items-center gap-3">
                                    <img src={rev.img} className="w-10 h-10 rounded-full border border-[var(--primary)]/20" alt="" />
                                    <div>
                                        <p className="font-bold text-sm">{rev.name}</p>
                                        <p className="text-[9px] opacity-40">{rev.email}</p>
                                    </div>
                                </td>
                                <td className="max-w-xs text-xs italic opacity-70">"{rev.text}"</td>
                                <td>
                                    <div className="flex gap-1 text-[var(--primary)]">
                                        {[...Array(rev.rating)].map((_, i) => <FaStar key={i} size={10} />)}
                                    </div>
                                </td>
                                <td className="text-[10px] opacity-50">{new Date(rev.createdAt).toLocaleDateString()}</td>
                                <td className="text-right p-5">
                                    <button onClick={() => handleDelete(rev._id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/10">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageWebReviews;