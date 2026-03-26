import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { FaStar, FaPaperPlane, FaCommentAlt, FaQuoteLeft, FaRegSmileBeam } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Component/shared/LoadingSpinner';

const ReviewInput = () => {
    const { users, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);

    const { mutateAsync: postReview, isLoading } = useMutation({
        mutationFn: async (reviewData) => {
            const res = await axiosSecure.post('/web-reviews', reviewData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
                icon: 'success',
                title: 'Review Shared!',
                text: 'Thank you for your valuable feedback.',
                confirmButtonColor: 'var(--primary)',
                customClass: { popup: 'rounded-2xl border border-[var(--primary)]/20 shadow-2xl' }
            });
            setRating(5);
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err.response?.data?.message || 'Could not connect to the server.',
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
            });
        }
    });

    if (authLoading) return <LoadingSpinner />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        if (!comment.trim()) return;

        const reviewData = {
            email: users?.email,
            text: comment,
            rating: rating,
        };

        try {
            await postReview(reviewData);
            form.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full space-y-8 animate-fade-in pb-10 px-2 md:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gradient-gold flex items-center gap-3">
                        <FaCommentAlt className="text-[var(--primary)]" /> User Experience
                    </h1>
                    <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-2 ml-1">
                        Help us grow by sharing your journey
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-2xl text-[var(--primary)] text-[10px] font-black uppercase tracking-widest">
                        Flash Feedback v2.0
                    </span>
                </div>
            </header>

            <div className="w-full bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6 md:p-12 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <FaQuoteLeft className="absolute -top-6 -left-6 text-[12rem] text-[var(--primary)] opacity-[0.03] rotate-12" />

                <form onSubmit={handleSubmit} className="w-full space-y-10 relative z-10">
                    <div className="w-full flex flex-col items-center gap-6 py-10 bg-[var(--bg-main)]/40 rounded-2xl border border-[var(--primary)]/10 backdrop-blur-sm">
                        <div className="text-center space-y-1">
                            <h3 className="text-[var(--primary)] font-black uppercase tracking-[0.2em] text-xs">Overall Satisfaction</h3>
                        </div>
                        <div className="flex gap-4 md:gap-6">
                            {[...Array(5)].map((_, index) => {
                                const val = index + 1;
                                return (
                                    <label key={index} className="cursor-pointer group">
                                        <input type="radio" className="hidden" onClick={() => setRating(val)} />
                                        <FaStar 
                                            className="transition-all duration-500 group-hover:scale-125"
                                            color={val <= (hover || rating) ? "var(--primary)" : "#1e293b"}
                                            size={window.innerWidth < 768 ? 32 : 45}
                                            onMouseEnter={() => setHover(val)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <div className="px-8 py-2 bg-[var(--bg-main)] rounded-2xl border border-[var(--primary)]/20 shadow-inner">
                            <p className="text-[var(--primary)] font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2">
                                <FaRegSmileBeam />
                                {rating === 5 ? "Elite" : rating === 4 ? "Great" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                            </p>
                        </div>
                    </div>

                    <div className="form-control w-full space-y-3">
                        <label className="uppercase text-[10px] font-black tracking-widest text-[var(--text-main)]/60 ml-1">Your Detailed Review</label>
                        <textarea 
                            name="comment"
                            placeholder="Share your experience with us..."
                            className="textarea textarea-bordered w-full bg-[var(--bg-main)]/50 border-[var(--primary)]/10 rounded-2xl h-48 focus:border-[var(--primary)]/40 focus:bg-[var(--bg-main)] transition-all text-sm md:text-base italic p-6 outline-none shadow-inner"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="btn-gradient w-full md:w-max min-w-[280px] px-16 py-5 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {isLoading ? "Processing..." : "Send Feedback"}
                            {!isLoading && <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewInput;