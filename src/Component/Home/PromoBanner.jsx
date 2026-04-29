import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaGem, FaArrowRight, FaClock, FaRocket, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
    const { data: promo, isLoading } = useQuery({
        queryKey: ['active-promo'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/active-promotion`);
            return res.data;
        }
    });

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (promo?.createdAt) {
            const timer = setInterval(() => {
                const createdDate = new Date(promo.createdAt).getTime();
                const expiryDate = createdDate + (7 * 24 * 60 * 60 * 1000);
                const now = new Date().getTime();
                const distance = expiryDate - now;

                if (distance < 0) {
                    clearInterval(timer);
                    setTimeLeft(null);
                } else {
                    setTimeLeft({
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        secs: Math.floor((distance % (1000 * 60)) / 1000)
                    });
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [promo]);

    if (isLoading) return null;

    // --- Empty State  ---
    if (!promo?.vehicleName || !timeLeft) {
        return (
            <section className="container mx-auto my-16 px-4">
                <div className="relative overflow-hidden rounded-2xl border border-dashed border-[var(--primary)]/30 bg-[var(--card-bg)] p-12 text-center">
                    <FaRocket className="mx-auto text-[var(--primary)] text-3xl mb-4 animate-bounce" />
                    <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)] uppercase tracking-tighter ">Something <span className="text-gradient-gold">Epic</span> is Coming</h2>
                    <p className="text-[var(--text-main)]/50 text-[10px] uppercase tracking-widest mt-2">New Luxury Fleet & Exclusive Discounts Under Preparation</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container my-16 mx-auto px-6">
            <div className="relative group rounded-2xl bg-[var(--card-bg)] border border-[var(--primary)]/10 overflow-hidden shadow-md gold-glow transition-all duration-500 h-auto lg:h-[420px]">
                
                <div className="flex flex-col lg:flex-row h-full">
                    
                    {/* Left Side: Content (Slanted) */}
                    <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center relative z-20 bg-[var(--card-bg)] lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-sm uppercase tracking-widest animate-pulse">
                                <FaFire className="inline mr-1" /> Hot Deal
                            </span>
                            <span className="text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]">
                                {timeLeft.days}D : {timeLeft.hours}H : {timeLeft.mins}M : {timeLeft.secs}S
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] uppercase tracking-tighter leading-[0.9] mb-4 ">
                            {promo.vehicleName.split(' ')[0]} <br/>
                            <span className="text-gradient-gold not-italic">{promo.vehicleName.split(' ').slice(1).join(' ')}</span>
                        </h2>

                        <p className="max-w-sm text-[var(--text-main)]/60 text-xs font-medium leading-relaxed mb-8 italic border-l-2 border-[var(--primary)] pl-4 line-clamp-2">
                            "{promo.description}"
                        </p>

                        {/* Pricing & Button */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div>
                                <span className="text-[8px] font-black text-[var(--primary)] uppercase tracking-widest">Limited Price</span>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl font-black text-[var(--text-main)]">${promo.discountPrice}</h3>
                                    <span className="text-sm text-[var(--text-main)]/20 line-through font-bold">${promo.originalPrice}</span>
                                </div>
                            </div>

                            <Link to={`/details/${promo.vehicleId}`} className="btn-gradient !rounded-xl !px-10 !py-4 flex items-center gap-3 group/btn shadow-lg">
                                <span className="text-[10px] font-black tracking-widest italic uppercase">Book Now</span>
                                <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Edge-to-Edge Image */}
                    <div className="w-full lg:w-[50%] relative lg:-ml-[8%] h-[300px] lg:h-full overflow-hidden">
                        <img 
                            src={promo.bannerImage} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-110" 
                            alt="Promotion"
                        />
                        
                        {/* Shadow to blend image with slant */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--card-bg)] to-transparent hidden lg:block opacity-40"></div>
                        
                        {/* Percentage Float Badge */}
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[var(--primary)] flex flex-col items-center justify-center shadow-md -rotate-12 group-hover:rotate-0 transition-all duration-500 border-4 border-[var(--card-bg)]">
                            <span className="text-xl font-black text-black leading-none">{promo.promotionPercentage}%</span>
                            <span className="text-[7px] font-bold text-black uppercase">OFF</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PromoBanner;