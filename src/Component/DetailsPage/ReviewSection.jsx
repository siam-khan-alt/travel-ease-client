import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaShieldAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ReviewSection = ({ vehicleId, users, instanceAxios, refetchVehicle }) => {
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(5);

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', vehicleId],
    queryFn: async () => {
      const res = await instanceAxios.get(`/reviews/${vehicleId}`);
      return res.data;
    }
  });

  const handleReviewSubmit = async () => {
    if (!comment) {return Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'Write something!',
      background: 'var(--card-bg)',
      color: 'var(--text-main)',   
      confirmButtonColor: 'var(--primary)',
    });}
    try {
      await instanceAxios.post("/reviews", { vehicleId, userEmail: users.email, userName: users.displayName, rating: userRating, comment });
      Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Review posted!',
      background: 'var(--card-bg)',
      color: 'var(--text-main)',
      confirmButtonColor: 'var(--primary)',
      iconColor: 'var(--primary)', 
      customClass: {
        popup: 'rounded-2xl border border-[var(--primary)]/20 shadow-xl', 
        title: 'font-black uppercase tracking-widest text-xl',
      }
    });
      setComment("");
      refetchReviews();
      refetchVehicle();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to post review';
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      background: 'var(--card-bg)',
      color: 'var(--text-main)',
      confirmButtonColor: '#ef4444', 
    });
    }
  };

  return (
    <div className="mt-20 border-t border-[var(--primary)]/10 pt-20">
      <h3 className="text-3xl font-black text-gradient-gold uppercase mb-12 text-center lg:text-left">Guest Experiences</h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
  {/* রিভিউ চেক করা হচ্ছে */}
  {reviews.length > 0 ? (
    reviews.map((r, i) => (
      <div key={i} className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/5 transition-all hover:border-[var(--primary)]/20">
        <div className="flex gap-4 mb-4 items-center">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center font-bold text-[var(--primary)]">
            {r.userName?.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider">{r.userName}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={8} className={i < r.rating ? "text-[var(--primary)]" : "opacity-10"} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm opacity-60 italic leading-relaxed">"{r.comment}"</p>
      </div>
    ))
  ) : (
    <div className="text-center py-20 bg-[var(--card-bg)] rounded-2xl border border-dashed border-[var(--primary)]/20">
      <div className="mb-4 flex justify-center opacity-20">
        <FaStar size={40} className="text-[var(--primary)] rotate-12" />
        <FaStar size={60} className="text-[var(--primary)] -mt-4" />
        <FaStar size={40} className="text-[var(--primary)] -rotate-12" />
      </div>
      <h4 className="text-xl font-bold opacity-40 uppercase tracking-widest">No Experiences Shared Yet</h4>
      <p className="text-xs opacity-30 mt-2">Be the first to share your journey with this vehicle!</p>
    </div>
  )}
</div>

        <div className="lg:col-span-5">
          {users ? (
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/10  sticky top-24">
              <div className="flex justify-center gap-2 mb-6">
                {[1,2,3,4,5].map(n => <FaStar key={n} size={24} className="cursor-pointer" color={n <= userRating ? "#D4AF37" : "#1e1e1e"} onClick={() => setUserRating(n)} />)}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-[var(--bg-main)] p-4 rounded-xl text-sm h-32 focus:outline-none border border-[var(--primary)]/10" placeholder="Your experience..." />
              <button onClick={handleReviewSubmit} className="btn-gradient w-full py-4 mt-4 rounded-xl font-bold uppercase tracking-widest text-xs">Submit</button>
            </div>
          ) : (
            <div className="bg-[var(--card-bg)] p-8 rounded-2xl text-center"><FaShieldAlt className="mx-auto text-2xl mb-4 text-[var(--primary)]" /><p className="text-xs font-bold  uppercase">Login to share review</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;