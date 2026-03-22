import React from "react";
import { FaCarSide } from "react-icons/fa";
import Motions from "../Motions";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] w-full bg-[var(--bg-main)]">
      <div className="relative flex items-center justify-center">
        
        {/* Main Golden Spinner Ring */}
        <div className="md:w-24 w-20 md:h-24 h-20 border-[3px] border-[var(--primary)]/10 border-t-[var(--primary)] border-b-[var(--primary)] rounded-full animate-spin"></div>
        
        {/* Inner Decorative Ring (Reverse Rotation) */}
        <div className="absolute md:w-16 w-14 md:h-16 h-14 border-[2px] border-transparent border-l-[var(--accent)] border-r-[var(--accent)] rounded-full animate-[spin_1.5s_linear_infinite_reverse] opacity-40"></div>
        
        {/* Center Premium Car Icon */}
        <div className="absolute flex items-center justify-center">
          <Motions
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <FaCarSide className="md:text-3xl text-2xl text-[var(--primary)]" />
          </Motions>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-[var(--primary)] animate-pulse">
          Preparing Your Fleet
        </p>
        <div className="flex gap-1 justify-center mt-2">
           <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
           <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;