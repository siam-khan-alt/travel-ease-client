import React from "react";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const Newsletter = () => {
  const instanceAxios = useAxios();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (email) => {
      const res = await instanceAxios.post("/subscribe", { email });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Success!",
        text: data.message || "You have successfully joined our elite circle!",
        icon: "success",
        confirmButtonColor: "var(--primary)",
        background: "var(--bg-main)",
        color: "var(--text-main)",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Subscription failed. Please try again.",
        icon: "error",
        confirmButtonColor: "var(--primary)",
        background: "var(--bg-main)",
        color: "var(--text-main)",
      });
    },
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    await mutateAsync(email);
    e.target.reset();
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)]">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden bg-[var(--card-bg)] border border-[var(--primary)]/20 rounded-2xl p-8 md:p-16 shadow-sm">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--primary)]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="max-w-xl text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-[var(--primary)]">
                <FaBell className="animate-bounce" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Stay Updated</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gradient-gold !text-left mb-4 ">
                Get Exclusive Offers & New Fleet Alerts
              </h2>
              <p className="text-[var(--text-main)] opacity-60 text-sm md:text-base leading-relaxed">
                Be the first to know about new vehicle arrivals, seasonal promotions, and exclusive luxury car rental deals delivered straight to your inbox.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <form onSubmit={handleSubscribe} className="relative group">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] px-6 py-5 rounded-2xl outline-none focus:border-[var(--primary)] transition-all duration-500 placeholder:text-[var(--text-main)]/30 text-sm"
                />
                <button
                  disabled={isPending}
                  type="submit"
                  className="mt-4 sm:mt-0 sm:absolute sm:right-2 sm:top-2 w-full sm:w-auto btn-gradient !py-3 !px-6 !rounded-xl flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Subscribing..." : "Subscribe"} 
                  {!isPending && <FaPaperPlane className="text-[10px]" />}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;