import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { FaStar, FaPaperPlane, FaCommentAlt, FaQuoteLeft, FaRegSmileBeam } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Component/shared/LoadingSpinner';

const ReviewInput = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false);

    if (authLoading) return <LoadingSpinner />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;

        if (!comment.trim()) return;

        setLoading(true);
        const reviewData = {
            name: user?.displayName,
            email: user?.email,
            img: user?.photoURL || "https://i.pravatar.cc/150",
            text: comment,
            rating: rating,
            role: "Verified Explorer",
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/web-reviews', reviewData);
            if (res.data.insertedId) {
                Swal.fire({
                    background: 'var(--card-bg)',
                    color: 'var(--text-main)',
                    icon: 'success',
                    title: 'Review Shared!',
                    text: 'Thank you for your valuable feedback.',
                    confirmButtonColor: 'var(--primary)',
                    customClass: {
                        popup: 'rounded-2xl border border-[var(--primary)]/20'
                    }
                });
                form.reset();
                setRating(5);
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-8 animate-fade-in pb-10">
            {/* Header Section */}
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

            {/* Main Form Container */}
            <div className="w-full bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6 md:p-12 shadow-md relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <FaQuoteLeft className="absolute -top-6 -left-6 text-[12rem] text-[var(--primary)] opacity-[0.03] rotate-12" />

                <form onSubmit={handleSubmit} className="w-full space-y-10 relative z-10">
                    
                    {/* Rating Selection Card */}
                    <div className="w-full flex flex-col items-center gap-6 py-10 bg-[var(--bg-main)]/40 rounded-2xl border border-[var(--primary)]/10 backdrop-blur-sm">
                        <div className="text-center space-y-1">
                            <h3 className="text-[var(--primary)] font-black uppercase tracking-[0.2em] text-xs">Overall Satisfaction</h3>
                            <p className="text-[var(--text-main)]/40 text-[10px] ">Click a star to set your rating</p>
                        </div>

                        <div className="flex gap-4 md:gap-6">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index} className="cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            className="hidden" 
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar 
                                            className="transition-all duration-500 group-hover:scale-125 group-active:scale-90 drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                                            color={ratingValue <= (hover || rating) ? "var(--primary)" : "#1e293b"}
                                            size={window.innerWidth < 768 ? 35 : 45}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>

                        <div className="px-8 py-2 bg-[var(--bg-main)] rounded-2xl border border-[var(--primary)]/20 shadow-inner">
                            <p className="text-[var(--primary)] font-black  text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-2">
                                <FaRegSmileBeam />
                                {rating === 5 ? "Elite Experience" : rating === 4 ? "Highly Satisfied" : rating === 3 ? "Good Service" : rating === 2 ? "Below Average" : "Needs Improvement"}
                            </p>
                        </div>
                    </div>

                    {/* Full Width Textarea */}
                    <div className="form-control w-full space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <label className="uppercase text-[10px] font-black tracking-widest text-[var(--text-main)]/60">Your Detailed Review</label>
                            <span className="text-[9px] font-bold text-[var(--primary)] opacity-60 uppercase italic underline decoration-[var(--primary)]/30">Verified Feedback</span>
                        </div>
                        <textarea 
                            name="comment"
                            placeholder="Tell us what you loved about Travel Ease or how we can make your experience even better..."
                            className="textarea textarea-bordered w-full bg-[var(--bg-main)]/50 border-[var(--primary)]/10 rounded-2xl h-48 focus:border-[var(--primary)]/40 focus:bg-[var(--bg-main)] transition-all text-sm md:text-base italic p-6 shadow-md outline-none placeholder:text-[var(--text-main)]/20"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button - Full Width on Mobile, Auto on Desktop */}
                    <div className="flex justify-center md:justify-start">
                        <button 
                            disabled={loading}
                            type="submit" 
                            className="btn-gradient w-full md:w-max min-w-[280px] px-16 py-5 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(0,0,0,0.3)] disabled:opacity-50 group"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Encrypting...
                                </span>
                            ) : (
                                <>
                                    <span>Send Feedback</span>
                                    <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewInput;