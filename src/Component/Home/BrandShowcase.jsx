import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// Icons
import { 
  SiMercedes, SiBmw, SiAudi, SiTesla, 
  SiLamborghini, SiPorsche, SiLandrover, 
  SiJeep, SiToyota, SiHyundai, SiVolkswagen, SiFord 
} from "react-icons/si";

const BrandShowcase = () => {
  const allBrands = [
    { name: "Mercedes", icon: <SiMercedes />, cat: "Luxury" },
    { name: "BMW", icon: <SiBmw />, cat: "Luxury" },
    { name: "Audi", icon: <SiAudi />, cat: "Sedan" },
    { name: "Tesla", icon: <SiTesla />, cat: "Sedan" },
    { name: "Range Rover", icon: <SiLandrover />, cat: "SUV" },
    { name: "Jeep", icon: <SiJeep />, cat: "SUV" },
    { name: "Porsche", icon: <SiPorsche />, cat: "Luxury" },
    { name: "Toyota", icon: <SiToyota />, cat: "Economy" },
    { name: "Hyundai", icon: <SiHyundai />, cat: "Economy" },
    { name: "Volkswagen", icon: <SiVolkswagen />, cat: "Economy" },
    { name: "Ford", icon: <SiFord />, cat: "SUV" },
    { name: "Lamborghini", icon: <SiLamborghini />, cat: "Luxury" },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)] overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] font-bold tracking-[0.4em] text-xs uppercase  mb-2"
          >
            Elite Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl  text-gradient-gold  "
          >
            Featured Brands
          </motion.h2>
        </div>

      </div>

      <div className="relative group">
        {/* Glass Overlay Shadows */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
            1440: { slidesPerView: 6, spaceBetween: 35 },
          }}
          className="brand-swiper !ease-linear"
        >
          {allBrands.map((brand, index) => (
            <SwiperSlide key={index} className="!transition-timing-function-linear">
              <div className="relative px-6 py-8 rounded-2xl bg-[var(--card-bg)] border border-white/5 transition-all duration-500 group/card hover:border-[var(--primary)]/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] overflow-hidden">
                
                {/* Background Glow Effect */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--primary)]/5 blur-3xl group-hover/card:bg-[var(--primary)]/10 transition-colors" />

                <div className="flex flex-col items-center text-center gap-4 relative z-10">
                  {/* Icon with Gold Gradient look */}
                  <div className="text-4xl text-[var(--primary)]   group-hover/card:scale-110 transition-all duration-700">
                    {brand.icon}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-[10px] md:text-xs text-gradient-gold">
                      {brand.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-[var(--primary)] animate-pulse" />
                      <span className="text-[8px] font-bold text-[var(--primary)] uppercase tracking-[0.2em] opacity-60">
                        {brand.cat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Border Glow */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS for perfectly linear motion */}
      <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default BrandShowcase;