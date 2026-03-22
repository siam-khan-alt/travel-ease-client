import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


import "swiper/css";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../LoadingSpinner";
import VehicleCard from "../Card/VehiclesCard";

const TopBooking = () => {
  const instanceAxios = useAxios();
  const [progress, setProgress] = useState(0);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["topVehicles"],
    queryFn: async () => {
      const res = await instanceAxios.get("/vehicles/top");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)] transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold mb-3">
            Elite Selection
          </p>
          <h2 className="main-heading">Most Booked Vehicles</h2>
          <div className="w-24 h-[1px] bg-[var(--primary)]/30 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={1}
            onProgress={(s) => setProgress(s.progress)}
            navigation={{
              nextEl: ".top-next-btn",
              prevEl: ".top-prev-btn",
            }}
            className="rounded-2xl"
          >
            {Array.from({ length: Math.ceil(vehicles.length / 2) }).map((_, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div className="flex flex-col gap-10 pb-4">
                  {vehicles.slice(slideIndex * 2, slideIndex * 2 + 2).map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle._id} 
                      vehicle={vehicle} 
                      isReverse={index % 2 !== 0} 
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-between gap-10 mt-16 px-2">
            
            <div className="flex-1 h-[6px] bg-[var(--accent)]/10 dark:bg-gray-800 relative rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] transition-all duration-700 ease-in-out" 
                style={{ width: `${Math.max(0.1, progress) * 100}%` }}
              ></div>
            </div>

            <div className="flex gap-4">
              <button className="top-prev-btn w-14 h-14 rounded-full border border-[var(--primary)]/20 flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-[var(--bg-main)] hover:border-[var(--primary)] transition-all duration-500 cursor-pointer group/btn shadow-lg">
                <FaChevronLeft className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
              <button className="top-next-btn w-14 h-14 rounded-full border border-[var(--primary)]/20 flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-[var(--bg-main)] hover:border-[var(--primary)] transition-all duration-500 cursor-pointer group/btn shadow-lg">
                <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBooking;