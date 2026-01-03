import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";

const HeroBanner = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/Mx1JPG9M/ev-running-costs.jpg",
      title: "Find Your Perfect Ride",
      desc: "Explore a variety of vehicles and book your next trip with ease and comfort."
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/gbDMmzgq/white-sedan-empty-autumn-road-car-driving-through-forest-169016-70260.avif",
      title: "Experience Luxury Travel",
      desc: "Premium cars for your special occasions at the most affordable prices."
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/q3dZDpSD/white-car-drives-along-mountain-highway-bright-sunny-day-blue-sky-clouds-symbolizing-travel-freedom.webp",
      title: "Your Journey, Our Priority",
      desc: "Safe, reliable, and well-maintained vehicles for every destination."
    }
  ];

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative container mx-auto  overflow-hidden dark:rounded-b-2xl dark:rounded-t-md  rounded-2xl h-[60vh] md:h-[70vh] border border-gray-100 dark:border-gray-800 shadow-2xl">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={true}
        allowTouchMove={false} 
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full flex items-center justify-center text-center">
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#F4F1DE]/40 dark:bg-[#0F172A]/70 mix-blend-multiply dark:mix-blend-normal"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 dark:to-[#0F172A]"></div>
              </div>

              <div className="relative z-10 px-6 max-w-4xl">
                <motion.h2 
                  variants={childVariants} 
                  initial="hidden" 
                  whileInView="visible"
                  className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>
                <motion.p 
                  variants={childVariants} 
                  initial="hidden" 
                  whileInView="visible"
                  className="text-lg md:text-xl mb-8 text-gray-100 dark:text-gray-300 font-medium max-w-2xl mx-auto drop-shadow-md"
                >
                  {slide.desc}
                </motion.p>

                <motion.div 
                  variants={childVariants} 
                  initial="hidden" 
                  whileInView="visible"
                  className="flex justify-center"
                >
                  <motion.button 
                    className="bg-[#E07A5F] hover:bg-[#D35D42] text-white px-10 py-4 rounded-full font-bold shadow-xl transition-colors border-2 border-transparent hover:border-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/allVehicles">View All Vehicles</Link>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-white/80 group-hover:text-[#F2CC8F] transition-colors">
          Explore
        </span>
        <FaChevronDown className="text-[#F2CC8F] text-xl" />
      </motion.div>
    </section>
  );
};

export default HeroBanner;