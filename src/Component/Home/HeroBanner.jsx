import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const HeroBanner = () => {
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: custom * 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden h-[75vh] md:h-[85vh] shadow-md group">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/*  Overlays - Optimized for both modes */}

        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-[var(--bg-main)]/30 dark:to-[var(--bg-main)] z-10"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 h-full w-full flex items-center justify-center text-center px-6">
        <div className="max-w-5xl">
          <motion.p
            custom={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-[var(--primary)] font-bold mb-6"
          >
            Elite Travel Experience
          </motion.p>

          <motion.h1
            custom={2}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] text-gradient-gold"
          >
            Drive The <br /> Distinction
          </motion.h1>

          <motion.p
            custom={3}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg mb-10 text-white dark:text-[var(--text-main)] font-medium max-w-2xl mx-auto tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] dark:drop-shadow-none"
          >
            Access our exclusive fleet of premium vehicles. Designed for those
            who demand excellence in every journey.
          </motion.p>
          <motion.div
            custom={4}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/allVehicles" className="btn-gradient">
                View All Fleet
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/*  Animated Scroll Down */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 text-[var(--primary)] opacity-70">
          Scroll
        </span>
        <FaChevronDown className="text-[var(--primary)] text-xl" />
      </motion.div>
    </section>
  );
};

export default HeroBanner;
