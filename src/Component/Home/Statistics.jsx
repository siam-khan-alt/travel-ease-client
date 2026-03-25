import React from "react";
import { motion } from "framer-motion";

const Statistics = () => {
  const stats = [
    { label: "Vehicles Available", value: "500+" },
    { label: "Happy Customers", value: "10k+" },
    { label: "Cities Covered", value: "150" },
    { label: "User Reviews", value: "4.9/5" },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Consistent Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] font-bold tracking-[0.4em] text-xs uppercase mb-2"
          >
            Our Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gradient-gold"
          >
            Milestone & Achievements
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group p-10 rounded-2xl bg-[var(--card-bg)] border border-white/5 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:border-[var(--primary)]/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              {/* Subtle Background Glow */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[var(--primary)]/5 blur-3xl group-hover:bg-[var(--primary)]/10 transition-colors" />

              {/* Stat Value */}
              <h3 className="text-4xl md:text-5xl font-black text-gradient-gold mb-3 tracking-tighter">
                {stat.value}
              </h3>

              {/* Divider Line */}
              <div className="w-10 h-[1px] bg-[var(--primary)] opacity-40 mb-3 group-hover:w-16 transition-all duration-500" />

              {/* Label */}
              <p className="text-[var(--text-main)] opacity-60 font-bold text-xs md:text-sm uppercase tracking-[0.2em] ">
                {stat.label}
              </p>

              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;