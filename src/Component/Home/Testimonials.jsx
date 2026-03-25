import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaQuoteRight, FaStar } from "react-icons/fa";

import "swiper/css";

const Testimonials = () => {
  const [progress, setProgress] = useState(0);

  const reviews = [
    { name: "Rahat Chowdhury", role: "Verified User", text: "The booking process was incredibly smooth. The SUV I rented was in top-notch condition and perfect for my business trip.", img: "https://i.pravatar.cc/150?u=1", rating: 5 },
    { name: "Tanvir Ahmed", role: "Happy Client", text: "Best rental prices I've found so far in Dhaka. Their customer service team helped me pick the right car for my family tour.", img: "https://i.pravatar.cc/150?u=2", rating: 5 },
    { name: "Mahmuda Akter", role: "Verified User", text: "Highly recommended! Huge variety of cars and very transparent pricing. No hidden charges at all, which is rare these days.", img: "https://i.pravatar.cc/150?u=3", rating: 5 },
    { name: "Ariful Islam", role: "Happy Client", text: "I've used many rental services, but Travel Ease stands out for their professionalism and car quality. Will book again!", img: "https://i.pravatar.cc/150?u=4", rating: 4 },
    { name: "Farhana Priti", role: "Verified User", text: "Managed my corporate trips easily through the dashboard. The interface is very user-friendly and the cars are luxurious.", img: "https://i.pravatar.cc/150?u=5", rating: 5 },
    { name: "Nabil Rahman", role: "Happy Client", text: "The Wishlist feature helped me track my favorite cars. Finally booked a Mustang for my birthday and it was epic!", img: "https://i.pravatar.cc/150?u=6", rating: 5 },
    { name: "Zubayer Hossain", role: "Verified User", text: "Secure payments and instant transaction IDs. I feel very safe using this platform for my high-end vehicle needs.", img: "https://i.pravatar.cc/150?u=7", rating: 5 },
    { name: "Sadia Afrin", role: "Happy Client", text: "Beautiful design and smooth experience. From selecting the car to the final payment, everything was seamless.", img: "https://i.pravatar.cc/150?u=8", rating: 5 },
    { name: "Mahim Ahmed", role: "Verified User", text: "The host was very polite and the car was spotless. I appreciate the verify-vehicle process they have in place.", img: "https://i.pravatar.cc/150?u=9", rating: 4 },
    { name: "Ishrat Jahan", role: "Happy Client", text: "A truly premium experience. The fleet is diverse and the booking history helps me track my expenses easily.", img: "https://i.pravatar.cc/150?u=10", rating: 5 },
    { name: "Kamrul Hassan", role: "Verified User", text: "Excellent service! The car was delivered right on time. This is now my go-to platform for all my travels.", img: "https://i.pravatar.cc/150?u=11", rating: 5 },
    { name: "Tanima Akter", role: "Happy Client", text: "I love the gold aesthetic of the site. It matches the luxury feel of the cars they provide. 10/10 experience!", img: "https://i.pravatar.cc/150?u=12", rating: 5 },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)] transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* 🏛️ Centered Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold mb-3">
            Community Voices
          </p>
          <h2 className="text-4xl md:text-5xl main-heading">What Our Clients Say</h2>
          <div className="w-24 h-[1px] bg-[var(--primary)]/30 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            breakpoints={{
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            onProgress={(s) => setProgress(s.progress)}
            navigation={{
              nextEl: ".next-btn-testi",
              prevEl: ".prev-btn-testi",
            }}
          >
            {reviews.map((rev, i) => (
              <SwiperSlide key={i} className="h-full">
                <div className="bg-[var(--card-bg)] p-10 rounded-2xl border border-[var(--primary)]/10 h-[400px] flex flex-col justify-between relative group/card hover:border-[var(--primary)]/40 transition-all duration-500  dark:shadow-none">
                  
                  {/* Top: Profile & Quote */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img 
                        src={rev.img} 
                        alt={rev.name} 
                        className="w-14 h-14 rounded-xl object-cover border border-[var(--primary)]/20 shadow-md group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div>
                        <h4 className="text-gradient-gold">{rev.name}</h4>
                        <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest">{rev.role}</p>
                      </div>
                    </div>
                    <FaQuoteRight className="text-xl text-[var(--primary)] opacity-10 group-hover/card:opacity-30 transition-opacity" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mt-6">
                    {[...Array(5)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className={`text-xs ${index < rev.rating ? "text-[var(--primary)]" : "text-gray-300 dark:text-gray-700"}`} 
                      />
                    ))}
                  </div>

                  {/* Middle: Text Content */}
                  <div className="flex-grow flex items-center py-4">
                    <p className="text-[var(--text-main)] opacity-70 leading-relaxed text-sm italic line-clamp-6">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Bottom: Card Footer */}
                  <div className="pt-6 border-t border-[var(--primary)]/5 flex items-center justify-between">
                    <div className="flex gap-1">
                       {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_5px_var(--primary)]/20"></div>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-[var(--primary)] opacity-50 uppercase tracking-tighter italic">Verified Experience</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/*  Bottom Controls (Progress & Arrows) */}
          <div className="flex items-center justify-between gap-10 mt-16 px-2">
            
            {/* Progress Bar */}
            <div className="flex-1 h-[6px] bg-gray-200 dark:bg-gray-800 relative rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] transition-all duration-700 ease-in-out" 
                style={{ width: `${Math.max(0.08, progress) * 100}%` }}
              ></div>
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-4">
              <button className="prev-btn-testi w-14 h-14 rounded-full border border-[var(--primary)]/20 flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all duration-500 cursor-pointer group/btn shadow-lg">
                <FaChevronLeft className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
              <button className="next-btn-testi w-14 h-14 rounded-full border border-[var(--primary)]/20 flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all duration-500 cursor-pointer group/btn shadow-lg">
                <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;