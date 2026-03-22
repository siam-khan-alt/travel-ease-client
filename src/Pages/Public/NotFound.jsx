import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCarCrash } from "react-icons/fa";
import Motions from "../../Component/Motions";

const NotFound = () => {
  return (
    <section className="relative bg-[var(--bg-main)]  overflow-hidden">
      <div className="container min-h-screen mx-auto px-6 flex flex-col items-center justify-center">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <Motions className="relative z-10 text-center max-w-2xl">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <FaCarCrash className="text-8xl md:text-9xl text-[var(--primary)] opacity-20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-6xl md:text-8xl font-black text-gradient-gold font-outfit tracking-tighter">404</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-3 text-[var(--primary)]">
            <span className="w-8 h-[1px] bg-[var(--primary)]/30"></span>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Lost in Luxury?</span>
            <span className="w-8 h-[1px] bg-[var(--primary)]/30"></span>
          </div>
          
          <h2 className="text-3xl md:text-5xl uppercase   text-gradient-gold">
            Wrong Turn <br /> 
            Road Ends Here
          </h2>
          
          <p className="text-[var(--text-main)] opacity-60 text-sm md:text-base font-poppins max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved or doesn't exist in our premium fleet database. Let's get you back on track.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-gradient w-full sm:w-auto px-10 py-4 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px] group"
          >
            <FaArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" />
            Return to Fleet
          </Link>
          
          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-4 rounded-xl border border-[var(--primary)]/20 text-[var(--text-main)] font-bold uppercase tracking-widest text-[11px] hover:bg-[var(--primary)]/5 transition-all duration-500"
          >
            Contact Concierge
          </Link>
        </div>
      </Motions>

      {/* Footer-like text for detail */}
      <div className="absolute bottom-10 left-0 w-full text-center">
         <p className="text-[8px] uppercase tracking-[0.8em] font-bold opacity-20 text-[var(--text-main)]">
            Travel Ease • Premium Mobility Service
         </p>
      </div>
      </div>
    </section>
  );
};

export default NotFound;